import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { otpCodes, users } from '@/lib/schema'
import { generateToken } from '@/lib/auth'
import { eq, and, gt } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    // Find valid OTP
    const [otpRecord] = await db.select().from(otpCodes).where(
      and(
        eq(otpCodes.email, email),
        eq(otpCodes.code, otp),
        eq(otpCodes.used, false),
        gt(otpCodes.expiresAt, new Date())
      )
    )

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    // Mark OTP as used
    await db.update(otpCodes).set({ used: true }).where(eq(otpCodes.id, otpRecord.id))

    // Find or create user
    let [user] = await db.select().from(users).where(eq(users.email, email))
    
    if (!user) {
      // Create new user for OTP verification
      [user] = await db.insert(users).values({
        name: email.split('@')[0],
        email,
        emailVerified: true,
        provider: 'email'
      }).returning()
    } else {
      // Update email verification status
      await db.update(users).set({ emailVerified: true }).where(eq(users.id, user.id))
    }

    // Generate token
    const token = generateToken(user.id, user.email)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified
      },
      token
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'OTP verification failed' }, { status: 500 })
  }
}