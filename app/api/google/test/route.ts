import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/google/callback`
  
  return NextResponse.json({
    clientId: clientId ? `${clientId.substring(0, 10)}...` : 'Not set',
    redirectUri,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    publicClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.substring(0, 10)}...` : 'Not set',
    instructions: {
      step1: 'Go to Google Cloud Console (console.cloud.google.com)',
      step2: 'Enable Google Drive API',
      step3: 'Go to Credentials > OAuth 2.0 Client IDs',
      step4: `Add redirect URI: ${redirectUri}`,
      step5: 'Make sure client ID matches your .env file'
    }
  })
}