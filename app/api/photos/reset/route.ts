import { NextResponse } from 'next/server'

export async function POST() {
  try {
    return NextResponse.json({ success: true, message: 'Reset endpoint ready' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reset photos' }, { status: 500 })
  }
}