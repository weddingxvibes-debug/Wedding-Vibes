import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { bookings } from '@/lib/schema'
import { sendApprovalEmail, addToCalendar } from '@/lib/email'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { bookingId, action } = await request.json()

    // Update booking status
    const [updatedBooking] = await db
      .update(bookings)
      .set({ 
        status: action === 'approve' ? 'approved' : 'rejected',
        updatedAt: new Date()
      })
      .where(eq(bookings.id, bookingId))
      .returning()

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Extract email from notes
    const emailMatch = updatedBooking.notes?.match(/Email: ([^\n]+)/)
    const userEmail = emailMatch ? emailMatch[1] : null

    if (userEmail) {
      if (action === 'approve') {
        // Add to calendar and send approval email
        await addToCalendar(updatedBooking)
        await sendApprovalEmail(userEmail, updatedBooking, 'approved')
      } else {
        // Send rejection email
        await sendApprovalEmail(userEmail, updatedBooking, 'rejected')
      }
    }

    return NextResponse.json({ success: true, booking: updatedBooking })
  } catch (error) {
    console.error('Approval error:', error)
    return NextResponse.json({ error: 'Action failed' }, { status: 500 })
  }
}