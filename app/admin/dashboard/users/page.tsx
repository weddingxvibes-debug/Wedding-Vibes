'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import MobileLayout from '@/components/admin/MobileLayout'

type User = {
  id: number
  name: string
  email: string
  phone: string | null
  role: string
  emailVerified: boolean
  provider: string
  createdAt: string
  updatedAt: string
}

export default function UsersPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState<'all' | string>('all')

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadUsers()
    } else {
      router.push('/admin')
    }
  }, [router])

  const loadUsers = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
        if (isRefresh) {
          toast.success('Users refreshed successfully')
        }
      } else {
        toast.error('Failed to fetch users')
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const filteredUsers = users.filter(user => 
    filter === 'all' || user.role === filter
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <MobileLayout activeTab="users">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Users Management</h2>
            <p className="text-gray-400 text-sm sm:text-base">Manage client information and leads</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['all', 'new', 'contacted', 'quoted', 'booked', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  filter === status 
                    ? 'bg-purple-600 text-white border border-purple-500' 
                    : 'bg-gray-800/50 text-gray-300 border border-gray-600 hover:bg-gray-700/50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 hover:bg-gray-700/20 transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.emailVerified ? 'bg-green-600/30 text-green-300 border border-green-600/50' :
                        'bg-red-600/30 text-red-300 border border-red-600/50'
                      }`}>
                        {user.emailVerified ? 'VERIFIED' : 'UNVERIFIED'}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-600/30 text-purple-300 border border-purple-600/50' :
                        'bg-blue-600/30 text-blue-300 border border-blue-600/50'
                      }`}>
                        {user.role?.toUpperCase() || 'USER'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300 mb-3">
                    <div className="flex items-center">
                      <span className="mr-2">📧</span>
                      <span className="break-all">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📱</span>
                      <span>{user.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🔐</span>
                      <span>{user.provider}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user)
                      setShowModal(true)
                    }}
                    className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg text-sm font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-all"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredUsers.length === 0 && (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="text-gray-300 text-xl font-semibold mb-2">
              No users found
            </div>
            <p className="text-gray-500">
              {filter === 'all' ? 'No users in the system yet' : `No users with role: ${filter}`}
            </p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedUser.name}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300">User Information</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-300">
                        <span className="mr-2">📧</span>
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="mr-2">📱</span>
                        <span>{selectedUser.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="mr-2">🔐</span>
                        <span>Provider: {selectedUser.provider}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="mr-2">✅</span>
                        <span>Email Verified: {selectedUser.emailVerified ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <span className="mr-2">👤</span>
                        <span>Role: {selectedUser.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Created: {new Date(selectedUser.createdAt).toLocaleString()}<br/>
                  Updated: {new Date(selectedUser.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  )
}