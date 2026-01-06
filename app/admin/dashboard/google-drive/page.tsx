'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { FolderOpen, Plus, RefreshCw, ExternalLink, Users, Image, Loader2 } from 'lucide-react'
import MobileLayout from '@/components/admin/MobileLayout'

export default function GoogleDrivePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    driveAccountId: '',
    folderUrl: '',
    folderName: '',
    folderType: 'gallery',
    accessLevel: 'public'
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadFolders()
    } else {
      router.push('/admin')
    }
  }, [router])

  const loadFolders = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/google/drive/folders')
      const data = await response.json()
      setFolders(data.folders || [])
    } catch (error) {
      toast.error('Failed to load folders')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleConnect = () => {
    // Use a simpler OAuth flow that works with existing Google setup
    const scope = encodeURIComponent('https://www.googleapis.com/auth/drive.readonly')
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/google/callback`)
    
    if (!clientId) {
      toast.error('Google Client ID not configured')
      return
    }
    
    const authUrl = `https://accounts.google.com/oauth/authorize?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=${scope}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`
    
    console.log('OAuth URL:', authUrl)
    window.open(authUrl, '_blank', 'width=500,height=600')
  }

  const handleAddFolder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/google/drive/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Folder added successfully')
        setShowAddForm(false)
        setFormData({ driveAccountId: '', folderUrl: '', folderName: '', folderType: 'gallery', accessLevel: 'public' })
        loadFolders()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to add folder')
      }
    } catch (error) {
      toast.error('Failed to add folder')
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      const response = await fetch('/api/google/drive/sync', { method: 'POST' })
      const data = await response.json()
      
      const successCount = data.results?.filter((r: any) => r.status === 'success').length || 0
      const errorCount = data.results?.filter((r: any) => r.status === 'error').length || 0
      
      if (successCount > 0) {
        toast.success(`Synced ${successCount} folders successfully`)
      }
      if (errorCount > 0) {
        toast.error(`${errorCount} folders failed to sync`)
      }
      
      loadFolders()
    } catch (error) {
      toast.error('Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <MobileLayout activeTab="google-drive">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Drive Gallery Sync</h2>
            <p className="text-gray-400 text-sm sm:text-base">Sync photos from Google Drive folders</p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Folder</span>
            </button>
            <button
              onClick={handleGoogleConnect}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <FolderOpen className="h-4 w-4" />
              <span>Connect Drive</span>
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Add Google Drive Folder</h3>
            <form onSubmit={handleAddFolder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Folder Name</label>
                <input
                  type="text"
                  value={formData.folderName}
                  onChange={(e) => setFormData({ ...formData, folderName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  placeholder="Wedding Gallery 2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Google Drive Folder URL</label>
                <input
                  type="url"
                  value={formData.folderUrl}
                  onChange={(e) => setFormData({ ...formData, folderUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  placeholder="https://drive.google.com/drive/folders/..."
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Folder Type</label>
                  <select
                    value={formData.folderType}
                    onChange={(e) => setFormData({ ...formData, folderType: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="gallery">Public Gallery</option>
                    <option value="client">Client Private</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Access Level</label>
                  <select
                    value={formData.accessLevel}
                    onChange={(e) => setFormData({ ...formData, accessLevel: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Folder
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 sm:p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-4" />
            <div className="text-gray-300 text-lg sm:text-xl font-semibold mb-2">
              Loading folders...
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              Please wait while we fetch your Drive folders
            </p>
          </div>
        ) : folders.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </div>
            <div className="text-gray-300 text-lg sm:text-xl font-semibold mb-2">
              No folders connected
            </div>
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              Connect your Google Drive and add folders to sync photos automatically
            </p>
            <button
              onClick={handleGoogleConnect}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Connect Google Drive
            </button>
          </div>
        ) : (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden">
            <div className="divide-y divide-gray-700">
              {folders.map((folder: any) => (
                <div key={folder.id} className="p-4 sm:p-6 hover:bg-gray-700/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        folder.folder_type === 'gallery' 
                          ? 'bg-purple-600/20 border border-purple-600/30' 
                          : 'bg-blue-600/20 border border-blue-600/30'
                      }`}>
                        {folder.folder_type === 'gallery' ? (
                          <Image className={`h-5 w-5 ${
                            folder.folder_type === 'gallery' ? 'text-purple-400' : 'text-blue-400'
                          }`} />
                        ) : (
                          <Users className={`h-5 w-5 ${
                            folder.folder_type === 'gallery' ? 'text-purple-400' : 'text-blue-400'
                          }`} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{folder.folder_name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            folder.folder_type === 'gallery'
                              ? 'bg-purple-600/30 text-purple-300 border border-purple-600/50'
                              : 'bg-blue-600/30 text-blue-300 border border-blue-600/50'
                          }`}>
                            {folder.folder_type === 'gallery' ? 'Public Gallery' : 'Client Private'}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            folder.access_level === 'public'
                              ? 'bg-green-600/30 text-green-300 border border-green-600/50'
                              : 'bg-yellow-600/30 text-yellow-300 border border-yellow-600/50'
                          }`}>
                            {folder.access_level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Last synced: {folder.last_synced_at ? new Date(folder.last_synced_at).toLocaleString() : 'Never'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {folder.folder_url && (
                        <a
                          href={folder.folder_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}