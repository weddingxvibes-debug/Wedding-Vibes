import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        // Add provider info to session
        session.user.provider = token.provider as string
        session.user.emailVerified = token.emailVerified as boolean
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const [existingUser] = await db.select().from(users).where(eq(users.email, user.email!))
          
          if (existingUser) {
            // Update existing user
            await db.update(users).set({
              provider: 'google',
              emailVerified: true
            }).where(eq(users.email, user.email!))
          } else {
            // Create new user
            await db.insert(users).values({
              name: user.name || user.email!.split('@')[0],
              email: user.email!,
              provider: 'google',
              emailVerified: true
            })
          }
        } catch (error) {
          console.error('Google sign-in error:', error)
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && user) {
        // Store user info in token for session callback
        token.provider = 'google'
        token.emailVerified = true
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to homepage after successful sign-in
      return baseUrl
    }
  },
  pages: {
    signIn: '/auth/login',
  },
})

export { handler as GET, handler as POST }