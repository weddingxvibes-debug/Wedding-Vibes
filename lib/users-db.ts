export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  eventType: string
  eventDate: string
  budget: string
  requirements: string
  source: string
  status: 'new' | 'contacted' | 'quoted' | 'booked' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  notes: string
  createdAt: string
  updatedAt: string
}

const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'Rahul & Priya Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91-9876543210',
    address: '123 MG Road',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    eventType: 'Wedding',
    eventDate: '2024-02-15',
    budget: '₹1,50,000',
    requirements: 'Traditional + Candid photography, Pre-wedding shoot, Album design',
    source: 'Instagram',
    status: 'quoted',
    priority: 'high',
    notes: 'Interested in premium package. Follow up on 15th Jan.',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T15:30:00Z'
  },
  {
    id: '2',
    name: 'Amit & Sneha Patel',
    email: 'amit.patel@email.com',
    phone: '+91-9123456789',
    address: '456 Civil Lines',
    city: 'Indore',
    state: 'Madhya Pradesh',
    eventType: 'Pre-Wedding',
    eventDate: '2024-01-25',
    budget: '₹50,000',
    requirements: 'Outdoor pre-wedding shoot, 2 locations, edited photos',
    source: 'Website',
    status: 'booked',
    priority: 'medium',
    notes: 'Confirmed booking. Advance paid ₹20,000.',
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-10T09:15:00Z'
  },
  {
    id: '3',
    name: 'Vikash & Anjali Singh',
    email: 'vikash.singh@email.com',
    phone: '+91-9988776655',
    address: '789 Nehru Nagar',
    city: 'Jabalpur',
    state: 'Madhya Pradesh',
    eventType: 'Engagement',
    eventDate: '2024-03-10',
    budget: '₹75,000',
    requirements: 'Ring ceremony, Family photos, Traditional setup',
    source: 'Referral',
    status: 'new',
    priority: 'medium',
    notes: 'New inquiry. Need to send quotation.',
    createdAt: '2024-01-14T11:45:00Z',
    updatedAt: '2024-01-14T11:45:00Z'
  }
]

export const initializeUsersDB = () => {
  if (typeof window === 'undefined') return
  
  const existingUsers = localStorage.getItem('users')
  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(SAMPLE_USERS))
  }
}

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return SAMPLE_USERS
  return JSON.parse(localStorage.getItem('users') || JSON.stringify(SAMPLE_USERS))
}

export const addUser = (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): void => {
  if (typeof window === 'undefined') return
  
  const users = getUsers()
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
}

export const updateUser = (id: string, updates: Partial<User>): void => {
  if (typeof window === 'undefined') return
  
  const users = getUsers()
  const userIndex = users.findIndex(u => u.id === id)
  
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('users', JSON.stringify(users))
  }
}

export const deleteUser = (id: string): void => {
  if (typeof window === 'undefined') return
  
  const users = getUsers()
  const updatedUsers = users.filter(u => u.id !== id)
  localStorage.setItem('users', JSON.stringify(updatedUsers))
}

export const getUserById = (id: string): User | undefined => {
  const users = getUsers()
  return users.find(u => u.id === id)
}