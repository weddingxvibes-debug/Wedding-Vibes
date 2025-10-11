import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { bookings } from '@/lib/schema'

export async function GET() {
  try {
    console.log('=== TEST BOOKINGS API ===')
    
    // Direct query like debug API
    const allBookings = await db.select().from(bookings)
    console.log('Bookings found:', allBookings.length)
    console.log('Bookings data:', JSON.stringify(allBookings, null, 2))
    
    return NextResponse.json({
      success: true,
      count: allBookings.length,
      bookings: allBookings
    })
  } catch (error) {
    console.error('Test bookings error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}