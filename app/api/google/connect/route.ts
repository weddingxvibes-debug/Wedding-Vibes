import { NextRequest, NextResponse } from 'next/server'
import { saveGoogleAccount } from '@/lib/google-photos'

// Force dynamic rendering for OAuth routes
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/google/callback`,
      }),
    })

    const tokens = await tokenResponse.json()
    
    if (!tokens.access_token) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 400 })
    }

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    })
    const userInfo = await userResponse.json()

    // Save to database
    const accountId = await saveGoogleAccount({
      email: userInfo.email,
      refreshToken: tokens.refresh_token,
      accessToken: tokens.access_token,
      tokenScope: tokens.scope,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000)
    })

    return NextResponse.json({ success: true, accountId })
  } catch (error) {
    console.error('Google connect error:', error)
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 })
  }
}