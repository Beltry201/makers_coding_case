import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as bcrypt from 'bcryptjs'
import { z } from 'zod'

// Validation schemas
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
})

const PreferencesSchema = z.object({
  preferredCategories: z.array(z.string()).optional(),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }).optional(),
  preferredBrands: z.array(z.string()).optional(),
  specialFeatures: z.array(z.string()).optional(),
}).optional()

export async function POST(req: Request) {
  try {
    const { user, preferences } = await req.json()

    // Validate user data
    const validatedUser = UserSchema.parse(user)
    const validatedPreferences = preferences ? PreferencesSchema.parse(preferences) : undefined

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedUser.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10)

    // Create user with optional preferences
    const newUser = await prisma.user.create({
      data: {
        email: validatedUser.email,
        password: hashedPassword,
        name: validatedUser.name,
        preferences: validatedPreferences || undefined,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        preferences: true,
        role: true,
        createdAt: true,
      }
    })

    // Create session
    const session = await prisma.session.create({
      data: {
        userId: newUser.id,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        token: crypto.randomUUID(),
      }
    })

    return NextResponse.json({
      user: newUser,
      session: {
        token: session.token,
        expires: session.expires,
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
} 