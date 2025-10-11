import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, bookings } from '@/lib/schema'

export async function POST() {
  try {
    // Insert sample users
    await db.insert(users).values([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91-9876543210',
        role: 'user',
        emailVerified: true,
        provider: 'email'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91-9876543211',
        role: 'user',
        emailVerified: false,
        provider: 'google'
      }
    ])

    // Insert sample bookings
    await db.insert(bookings).values([
      {
        eventType: 'Wedding',
        date: '2024-03-15',
        time: '10:00',
        venue: 'Grand Palace Hotel',
        notes: 'Contact: +91-9876543210\nEmail: john@example.com\nMessage: Looking for wedding photography package',
        status: 'pending'
      },
      {
        eventType: 'Pre-Wedding',
        date: '2024-02-20',
        time: '16:00',
        venue: 'Beach Resort',
        notes: 'Contact: +91-9876543211\nEmail: jane@example.com\nMessage: Outdoor pre-wedding shoot required',
        status: 'approved'
      }
    ])

    return NextResponse.json({ success: true, message: 'Sample data inserted' })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}