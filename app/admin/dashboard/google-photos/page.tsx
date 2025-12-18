'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Camera, Plus, RefreshCw, ExternalLink } from 'lucide-react'

export default function GooglePhotosPage() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    googleAccountId: '',
    albumId: '',
    shareUrl: '',
    name: ''
  })

  useEffect(() => {
    loadAlbums()
  }, [])

  const loadAlbums = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/google/albums')
      const data = await response.json()
      setAlbums(data.albums || [])
    } catch (error) {
      toast.error('Failed to load albums')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleConnect = () => {
    const scope = 'https://www.googleapis.com/auth/photoslibrary.readonly'
    const redirectUri = `${window.location.origin}/api/google/callback`
    const authUrl = `https://accounts.google.com/oauth/authorize?` +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`
    
    window.location.href = authUrl
  }

  const handleAddAlbum = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/google/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Album added successfully')
        setShowAddForm(false)
        setFormData({ googleAccountId: '', albumId: '', shareUrl: '', name: '' })
        loadAlbums()
      } else {
        toast.error('Failed to add album')
      }
    } catch (error) {
      toast.error('Failed to add album')
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      const response = await fetch('/api/google/sync', { method: 'POST' })
      const data = await response.json()
      
      const successCount = data.results?.filter((r: any) => r.status === 'success').length || 0
      const errorCount = data.results?.filter((r: any) => r.status === 'error').length || 0
      
      if (successCount > 0) {
        toast.success(`Synced ${successCount} albums successfully`)
      }
      if (errorCount > 0) {
        toast.error(`${errorCount} albums failed to sync`)
      }
      
      loadAlbums()
    } catch (error) {
      toast.error('Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Google Photos Integration</h1>
          <p className="text-gray-600 dark:text-gray-400">Sync photos from Google Photos albums</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Album
          </button>
          <button
            onClick={handleGoogleConnect}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Camera className="h-4 w-4 mr-2" />
            Connect Google
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add Google Photos Album</h3>
          <form onSubmit={handleAddAlbum} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Album Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Google Album ID</label>
              <input
                type="text"
                value={formData.albumId}
                onChange={(e) => setFormData({ ...formData, albumId: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="Album ID from Google Photos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Share URL (optional)</label>
              <input
                type="url"
                value={formData.shareUrl}
                onChange={(e) => setFormData({ ...formData, shareUrl: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://photos.app.goo.gl/..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Album
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Connected Albums</h2>
          {loading ? (
            <div className="text-center py-8">Loading albums...</div>
          ) : albums.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No albums connected. Add an album to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {albums.map((album: any) => (
                <div key={album.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{album.name}</h3>
                    <p className="text-sm text-gray-500">Account: {album.account_email}</p>
                    <p className="text-sm text-gray-500">
                      Last synced: {album.last_synced_at ? new Date(album.last_synced_at).toLocaleString() : 'Never'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {album.external_album_url && (
                      <a
                        href={album.external_album_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}