import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { otpCodes } from '@/lib/schema'
import { sendOTPEmail } from '@/lib/email'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Delete existing OTPs for this email
    await db.delete(otpCodes).where(eq(otpCodes.email, email))

    // Save new OTP
    await db.insert(otpCodes).values({
      email,
      code: otp,
      expiresAt
    })

    // Send OTP email
    await sendOTPEmail(email, otp)

    return NextResponse.json({ message: 'OTP sent successfully' })
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}