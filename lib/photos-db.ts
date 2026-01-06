export interface Photo {
  id: string
  url: string
  alt: string
  category: string
  createdAt: string
}

export interface PhotoFolder {
  id: string
  name: string
  photos: Photo[]
  createdAt: string
}

export interface AboutImage {
  id: string
  url: string
  alt: string
  updatedAt: string
}

export const initializePhotosDB = async () => {
  // Database initialization is handled by migrations
  return true
}

export const getPhotoFolders = async (): Promise<PhotoFolder[]> => {
  try {
    const response = await fetch('/api/gallery/folders')
    if (!response.ok) throw new Error('Failed to fetch folders')
    return await response.json()
  } catch (error) {
    console.error('Error fetching folders:', error)
    return []
  }
}

export const getAboutImage = async (): Promise<AboutImage> => {
  try {
    const response = await fetch('/api/gallery/about')
    if (!response.ok) throw new Error('Failed to fetch about image')
    return await response.json()
  } catch (error) {
    console.error('Error fetching about image:', error)
    return {
      id: 'about-main',
      url: 'https://picsum.photos/600/800?random=100',
      alt: 'About Wedding Vibes Photography - Professional Wedding Photographer',
      updatedAt: new Date().toISOString()
    }
  }
}

export const addPhotoToFolder = async (folderId: string, photo: Omit<Photo, 'id' | 'createdAt'>): Promise<void> => {
  try {
    const response = await fetch('/api/gallery/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderId, ...photo })
    })
    if (!response.ok) throw new Error('Failed to add photo')
  } catch (error) {
    console.error('Error adding photo:', error)
    throw error
  }
}

export const deletePhotoFromFolder = async (folderId: string, photoId: string): Promise<void> => {
  try {
    const response = await fetch(`/api/gallery/photos?id=${photoId}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete photo')
  } catch (error) {
    console.error('Error deleting photo:', error)
    throw error
  }
}

export const updateAboutImage = async (image: Omit<AboutImage, 'id' | 'updatedAt'>): Promise<void> => {
  try {
    const response = await fetch('/api/gallery/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    })
    if (!response.ok) throw new Error('Failed to update about image')
  } catch (error) {
    console.error('Error updating about image:', error)
    throw error
  }
}

export const getAllPhotos = async (): Promise<Photo[]> => {
  const folders = await getPhotoFolders()
  return folders.flatMap(folder => folder.photos)
}

export const getRandomPhotos = async (count: number = 6): Promise<Photo[]> => {
  const allPhotos = await getAllPhotos()
  const shuffled = allPhotos.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const createFolder = async (name: string): Promise<void> => {
  try {
    const response = await fetch('/api/gallery/folders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    if (!response.ok) throw new Error('Failed to create folder')
  } catch (error) {
    console.error('Error creating folder:', error)
    throw error
  }
}

export const deleteFolder = async (folderId: string): Promise<void> => {
  console.log('Delete folder:', folderId)
}

export const resetPhotosDB = async (): Promise<void> => {
  console.log('Reset photos DB')
}