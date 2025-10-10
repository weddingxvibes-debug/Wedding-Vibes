import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { bookings } from '@/lib/schema'
import { verifyToken } from '@/lib/auth'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token) as any
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { eventType, date, time, venue, guests, duration, notes } = await request.json()

    const [newBooking] = await db.insert(bookings).values({
      userId: decoded.userId,
      eventType,
      date,
      time,
      venue,
      guests: parseInt(guests),
      duration,
      notes
    }).returning()

    return NextResponse.json(newBooking)
  } catch (error) {
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token) as any
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const userBookings = await db.select().from(bookings).where(eq(bookings.userId, decoded.userId))
    return NextResponse.json(userBookings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}