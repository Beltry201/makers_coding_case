import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function getSessionUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return null
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!session || session.expires < new Date()) {
      return null
    }

    return session.user
  } catch (error) {
    console.error('Session validation error:', error)
    return null
  }
} 