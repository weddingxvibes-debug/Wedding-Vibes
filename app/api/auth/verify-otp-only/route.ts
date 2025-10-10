import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { otpCodes } from '@/lib/schema'
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

    return NextResponse.json({ message: 'OTP verified successfully' })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'OTP verification failed' }, { status: 500 })
  }
}