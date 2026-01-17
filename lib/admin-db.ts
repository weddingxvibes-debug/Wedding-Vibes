interface AdminUser {
  id: string
  email: string
  password: string
  role: 'admin'
  createdAt: string
}

const DEFAULT_ADMIN: AdminUser = {
  id: 'admin-1',
  email: 'weddingxvibes@gmail.com',
  password: 'Uday@123',
  role: 'admin',
  createdAt: new Date().toISOString()
}

export const initializeAdminDB = () => {
  if (typeof window === 'undefined') return
  
  const existingAdmin = localStorage.getItem('adminUsers')
  if (!existingAdmin) {
    localStorage.setItem('adminUsers', JSON.stringify([DEFAULT_ADMIN]))
  }
}

export const validateAdmin = (email: string, password: string): boolean => {
  if (typeof window === 'undefined') return false
  
  const adminUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]')
  return adminUsers.some((admin: AdminUser) => 
    admin.email === email && admin.password === password
  )
}

export const getAdminUsers = (): AdminUser[] => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('adminUsers') || '[]')
}