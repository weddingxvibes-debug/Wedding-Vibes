import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
        const userWithId = session.user as any
        userWithId.id = token.sub
        userWithId.provider = token.provider
        userWithId.emailVerified = token.emailVerified
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          if (process.env.DATABASE_URL) {
            const { db } = await import('@/lib/db')
            const { users } = await import('@/lib/schema')
            const { eq } = await import('drizzle-orm')
            
            const [existingUser] = await db.select().from(users).where(eq(users.email, user.email!))
            
            if (existingUser) {
              await db.update(users).set({
                provider: 'google',
                emailVerified: true
              }).where(eq(users.email, user.email!))
            } else {
              await db.insert(users).values({
                name: user.name || user.email!.split('@')[0],
                email: user.email!,
                provider: 'google',
                emailVerified: true
              })
            }
          }
        } catch (error) {
          console.error('Google sign-in error:', error)
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && user) {
        token.provider = 'google'
        token.emailVerified = true
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
  pages: {
    signIn: '/auth/login',
  },
})

export { handler as GET, handler as POST }