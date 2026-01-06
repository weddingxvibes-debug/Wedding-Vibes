import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { bookings, users } from '@/lib/schema'
import { sendBookingEmails } from '@/lib/email'
import { eq } from 'drizzle-orm'

// Force dynamic rendering for routes using request.url
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { eventType, eventDate, venue, contactNumber, email, message, userId } = await request.json()

    // Insert booking into database
    const [newBooking] = await db.insert(bookings).values({
      userId: null,
      eventType,
      date: eventDate,
      time: '00:00',
      venue,
      notes: `Contact: ${contactNumber}\nEmail: ${email}\nMessage: ${message}`,
      status: 'pending'
    }).returning()

    // Send emails
    await sendBookingEmails({
      userEmail: email,
      adminEmail: 'udaydeshmukh248@gmail.com',
      bookingDetails: {
        id: newBooking.id,
        eventType,
        eventDate,
        venue,
        contactNumber,
        email,
        message
      }
    })

    return NextResponse.json({ success: true, booking: newBooking })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Get bookings by email from notes field
    const userBookings = await db.select().from(bookings)
    const filteredBookings = userBookings.filter(booking => 
      booking.notes?.includes(`Email: ${email}`)
    )
    
    return NextResponse.json(filteredBookings)
  } catch (error) {
    console.error('Fetch bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}