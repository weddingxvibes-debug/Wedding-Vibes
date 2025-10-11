'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const [localUser, setLocalUser] = useState<any>(null)

  useEffect(() => {
    // Check localStorage for regular login
    const userData = localStorage.getItem('user')
    if (userData) {
      setLocalUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    // Store OAuth session data in localStorage for consistency
    if (session?.user && status === 'authenticated') {
      const userData = {
        id: (session.user as any).id || session.user.email,
        name: session.user.name,
        email: session.user.email,
        provider: 'google',
        emailVerified: true
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setLocalUser(userData)
    }
  }, [session, status])

  const user = session?.user ? {
    id: (session.user as any).id || session.user.email,
    name: session.user.name,
    email: session.user.email,
    provider: 'google',
    emailVerified: true
  } : localUser

  return {
    user,
    isLoading: status === 'loading',
    isAuthenticated: !!user
  }
}