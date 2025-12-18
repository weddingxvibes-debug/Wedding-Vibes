import { NextRequest, NextResponse } from 'next/server'
import { saveGoogleAccount } from '@/lib/google-photos'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/dashboard/google-photos?error=${error}`)
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/dashboard/google-photos?error=no_code`)
    }

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
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/dashboard/google-photos?error=token_failed`)
    }

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    })
    const userInfo = await userResponse.json()

    // Save to database
    await saveGoogleAccount({
      email: userInfo.email,
      refreshToken: tokens.refresh_token,
      accessToken: tokens.access_token,
      tokenScope: tokens.scope,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000)
    })

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/dashboard/google-photos?success=connected`)
  } catch (error) {
    console.error('Google callback error:', error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/dashboard/google-photos?error=callback_failed`)
  }
}