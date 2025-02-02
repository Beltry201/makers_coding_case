import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    // Get the token from Authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid token' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]

    // Find valid session
    const session = await prisma.session.findFirst({
      where: {
        token,
        expires: {
          gt: new Date(), // Check if session hasn't expired
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            preferences: true,
          },
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      )
    }

    // Return user data and session info
    return NextResponse.json({
      user: session.user,
      session: {
        token: session.token,
        expires: session.expires,
      },
    })
  } catch (error) {
    console.error('Session validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate session' },
      { status: 500 }
    )
  }
} 