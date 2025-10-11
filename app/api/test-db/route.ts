import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, bookings } from '@/lib/schema'

export async function GET() {
  try {
    const userCount = await db.select().from(users)
    const bookingCount = await db.select().from(bookings)
    
    return NextResponse.json({
      success: true,
      users: userCount.length,
      bookings: bookingCount.length,
      usersList: userCount,
      bookingsList: bookingCount
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}