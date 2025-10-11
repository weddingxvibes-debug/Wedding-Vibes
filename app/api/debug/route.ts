import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, bookings } from '@/lib/schema'

export async function GET() {
  try {
    console.log('=== DEBUG API ===')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'EXISTS' : 'MISSING')
    
    // Test basic connection
    const testUsers = await db.select().from(users).limit(1)
    const testBookings = await db.select().from(bookings).limit(1)
    
    console.log('Users table accessible:', true)
    console.log('Bookings table accessible:', true)
    
    return NextResponse.json({
      success: true,
      database_url_exists: !!process.env.DATABASE_URL,
      users_table: 'accessible',
      bookings_table: 'accessible',
      sample_user: testUsers[0] || null,
      sample_booking: testBookings[0] || null
    })
  } catch (error) {
    console.error('Debug API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      database_url_exists: !!process.env.DATABASE_URL
    }, { status: 500 })
  }
}