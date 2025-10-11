'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getPhotoFolders, getAboutImage, addPhotoToFolder, deletePhotoFromFolder, updateAboutImage, initializePhotosDB, createFolder, deleteFolder, type PhotoFolder, type AboutImage } from '@/lib/photos-db'
import { convertFileToBase64, validateImageFile, compressImage } from '@/lib/file-upload'
import MobileLayout from '@/components/admin/MobileLayout'
import LoadingSpinner, { PageLoader } from '@/components/admin/LoadingSpinner'

export default function PhotosPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [folders, setFolders] = useState<PhotoFolder[]>([])
  const [aboutImage, setAboutImage] = useState<AboutImage | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<string>('about')
  const [newPhotoUrl, setNewPhotoUrl] = useState('')
  const [newPhotoAlt, setNewPhotoAlt] = useState('')
  const [newAboutUrl, setNewAboutUrl] = useState('')
  const [newAboutAlt, setNewAboutAlt] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('file')
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({})
  const [showCreateFolder, setShowCreateFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      initializePhotosDB()
      loadData()
      setTimeout(() => setLoading(false), 800)
    } else {
      router.push('/admin')
    }
  }, [router])

  const loadData = () => {
    setFolders(getPhotoFolders())
    setAboutImage(getAboutImage())
  }

  if (!isAuthenticated || loading) {
    return <PageLoader />
  }

  return (
    <MobileLayout activeTab="photos">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 animate-fadeIn">Photos Management</h1>
          <p className="text-gray-400 text-sm lg:text-base animate-fadeIn" style={{ animationDelay: '0.1s' }}>Manage portfolio and gallery images</p>
        </div>

        <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Photo Folders</h3>
            <button
              onClick={() => setShowCreateFolder(!showCreateFolder)}
              className="px-3 py-2 bg-green-600/20 text-green-400 rounded-xl text-sm font-medium border border-green-600/30 hover:bg-green-600/30 transition-all flex items-center space-x-2"
            >
              <span>➕</span>
              <span>New Folder</span>
            </button>
          </div>
          
          {showCreateFolder && (
            <div className="bg-gray-700/20 rounded-xl p-4 border border-gray-600/30 animate-slideUp">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name (e.g., Mehendi, Sangeet)"
                  className="flex-1 px-3 py-2 bg-gray-700/30 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newFolderName.trim()) {
                      createFolder(newFolderName.trim())
                      loadData()
                      setNewFolderName('')
                      setShowCreateFolder(false)
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (newFolderName.trim()) {
                      createFolder(newFolderName.trim())
                      loadData()
                      setNewFolderName('')
                      setShowCreateFolder(false)
                    }
                  }}
                  disabled={!newFolderName.trim()}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all"
                >
                  Create
                </button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setSelectedFolder('about')}
              className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center space-y-1 ${
                selectedFolder === 'about'
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <span className="text-lg">📷</span>
              <span className="text-xs">About</span>
            </button>
            {folders.map((folder) => (
              <div key={folder.id} className="relative group">
                <button
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center space-y-1 ${
                    selectedFolder === folder.id
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <span className="text-lg">🖼️</span>
                  <span className="text-xs">{folder.name}</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${folder.name}" folder and all its photos?`)) {
                      deleteFolder(folder.id)
                      loadData()
                      if (selectedFolder === folder.id) {
                        setSelectedFolder('about')
                      }
                    }
                  }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedFolder === 'about' ? (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 lg:p-6 animate-slideUp">
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">About Section Image</h3>
            
            {aboutImage && (
              <div className="mb-6">
                <div className="relative w-full h-48 lg:h-64 bg-gray-700/50 rounded-xl overflow-hidden mb-4 group">
                  {imageLoading[aboutImage.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 z-10">
                      <LoadingSpinner size="lg" />
                    </div>
                  )}
                  <Image
                    src={aboutImage.url}
                    alt={aboutImage.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={() => setImageLoading(prev => ({ ...prev, [aboutImage.id]: false }))}
                    onLoadStart={() => setImageLoading(prev => ({ ...prev, [aboutImage.id]: true }))}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2Ij5ObyBJbWFnZTwvdGV4dD4KPHN2ZyB4PSIxNzAiIHk9IjE1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjOUNBM0FGIj4KPHA+CjxwYXRoIGQ9Ik00IDEyYTggOCAwIDAxOC04aDI0YTggOCAwIDAxOCA4djI0YTggOCAwIDAxLTggOEgxMmE4IDggMCAwMS04LThWMTJ6bTggMGE0IDQgMCAwMC00IDR2MTJsOC04IDEwIDEwVjEyYTQgNCAwIDAwLTQtNEgxMnoiLz4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iNCIvPgo8L3N2Zz4KPC9zdmc+'
                      setImageLoading(prev => ({ ...prev, [aboutImage.id]: false }))
                    }}
                  />
                </div>
                <p className="text-gray-400 text-sm">{aboutImage.alt}</p>
              </div>
            )}
            
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setUploadMethod('file')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    uploadMethod === 'file' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <span>📁</span>
                  <span>Upload File</span>
                </button>
                <button
                  onClick={() => setUploadMethod('url')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    uploadMethod === 'url' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <span>🔗</span>
                  <span>Image URL</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {uploadMethod === 'file' ? (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file && validateImageFile(file)) {
                        setUploading(true)
                        try {
                          const compressedImage = await compressImage(file)
                          setNewAboutUrl(compressedImage)
                        } catch (error) {
                          console.error('Error processing image:', error)
                        }
                        setUploading(false)
                      } else {
                        alert('Please select a valid image file (JPEG, PNG, WebP) under 5MB')
                      }
                    }}
                    className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Image URL</label>
                  <input
                    type="url"
                    value={newAboutUrl}
                    onChange={(e) => setNewAboutUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Alt Text</label>
                <input
                  type="text"
                  value={newAboutAlt}
                  onChange={(e) => setNewAboutAlt(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder="Describe the image..."
                />
              </div>
              <button
                onClick={() => {
                  if (newAboutUrl && newAboutAlt) {
                    updateAboutImage({ url: newAboutUrl, alt: newAboutAlt })
                    loadData()
                    setNewAboutUrl('')
                    setNewAboutAlt('')
                  }
                }}
                disabled={uploading || !newAboutUrl || !newAboutAlt}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none flex items-center justify-center space-x-2"
              >
                {uploading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Update About Image</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 lg:p-6 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg lg:text-xl font-semibold text-white">
                {folders.find(f => f.id === selectedFolder)?.name} Gallery
              </h3>
            </div>
            
            <div className="mb-6 p-4 bg-gray-700/20 rounded-xl border border-gray-600/30">
              <h4 className="text-base lg:text-lg font-medium text-white mb-4">Add New Photo</h4>
              
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => setUploadMethod('file')}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      uploadMethod === 'file' 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    <span>📁</span>
                    <span>Upload File</span>
                  </button>
                  <button
                    onClick={() => setUploadMethod('url')}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                      uploadMethod === 'url' 
                        ? 'bg-purple-600 text-white shadow-lg' 
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    <span>🔗</span>
                    <span>Image URL</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 mb-4">
                {uploadMethod === 'file' ? (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file && validateImageFile(file)) {
                          setUploading(true)
                          try {
                            const compressedImage = await compressImage(file)
                            setNewPhotoUrl(compressedImage)
                          } catch (error) {
                            console.error('Error processing image:', error)
                          }
                          setUploading(false)
                        } else {
                          alert('Please select a valid image file (JPEG, PNG, WebP) under 5MB')
                        }
                      }}
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Image URL</label>
                    <input
                      type="url"
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Alt Text</label>
                  <input
                    type="text"
                    value={newPhotoAlt}
                    onChange={(e) => setNewPhotoAlt(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="Describe the image..."
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  if (newPhotoUrl && newPhotoAlt && selectedFolder !== 'about') {
                    addPhotoToFolder(selectedFolder, {
                      url: newPhotoUrl,
                      alt: newPhotoAlt,
                      category: selectedFolder
                    })
                    loadData()
                    setNewPhotoUrl('')
                    setNewPhotoAlt('')
                  }
                }}
                disabled={uploading || !newPhotoUrl || !newPhotoAlt}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none flex items-center justify-center space-x-2"
              >
                {uploading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Add Photo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {folders.find(f => f.id === selectedFolder)?.photos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="bg-gray-700/20 rounded-xl overflow-hidden border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 group animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-square bg-gray-600/30">
                    {imageLoading[photo.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 z-10">
                        <LoadingSpinner />
                      </div>
                    )}
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      onLoad={() => setImageLoading(prev => ({ ...prev, [photo.id]: false }))}
                      onLoadStart={() => setImageLoading(prev => ({ ...prev, [photo.id]: true }))}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2Ij5ObyBJbWFnZTwvdGV4dD4KPHN2ZyB4PSIxNzAiIHk9IjE1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjOUNBM0FGIj4KPHA+CjxwYXRoIGQ9Ik00IDEyYTggOCAwIDAxOC04aDI0YTggOCAwIDAxOCA4djI0YTggOCAwIDAxLTggOEgxMmE4IDggMCAwMS04LThWMTJ6bTggMGE0IDQgMCAwMC00IDR2MTJsOC04IDEwIDEwVjEyYTQgNCAwIDAwLTQtNEgxMnoiLz4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iNCIvPgo8L3N2Zz4KPC9zdmc+'
                        setImageLoading(prev => ({ ...prev, [photo.id]: false }))
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-gray-300 text-xs mb-2 line-clamp-2">{photo.alt}</p>
                    <button
                      onClick={() => {
                        if (confirm('Delete this photo?')) {
                          deletePhotoFromFolder(selectedFolder, photo.id)
                          loadData()
                        }
                      }}
                      className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-2 py-2 rounded-lg text-xs font-medium transition-all border border-red-600/30 hover:border-red-500/50 active:scale-95 flex items-center justify-center space-x-1"
                    >
                      <span>🗑️</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )) || []}
            </div>
            
            {folders.find(f => f.id === selectedFolder)?.photos.length === 0 && (
              <div className="col-span-full text-center py-12 animate-fadeIn">
                <div className="w-16 h-16 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-gray-300 text-lg font-semibold mb-2">
                  No photos in this folder
                </div>
                <p className="text-gray-500">
                  Add photos using the form above
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </MobileLayout>
  )
}