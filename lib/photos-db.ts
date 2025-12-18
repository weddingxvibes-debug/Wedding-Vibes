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

const DEFAULT_FOLDERS: PhotoFolder[] = [
  {
    id: 'weddings',
    name: 'Weddings',
    photos: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'pre-wedding',
    name: 'Pre-Wedding',
    photos: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'engagement',
    name: 'Engagement',
    photos: [],
    createdAt: new Date().toISOString()
  }
]

const DEFAULT_ABOUT_IMAGE: AboutImage = {
  id: 'about-main',
  url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format',
  alt: 'About Wedding Vibes Photography - Professional Wedding Photographer',
  updatedAt: new Date().toISOString()
}

export const initializePhotosDB = () => {
  if (typeof window === 'undefined') return
  
  const existingFolders = localStorage.getItem('photoFolders')
  if (!existingFolders) {
    // Initialize with sample photos
    const foldersWithSamples = DEFAULT_FOLDERS.map(folder => {
      const samplePhotos = getSamplePhotosForCategory(folder.id)
      return {
        ...folder,
        photos: samplePhotos
      }
    })
    localStorage.setItem('photoFolders', JSON.stringify(foldersWithSamples))
  }
  
  const existingAbout = localStorage.getItem('aboutImage')
  if (!existingAbout) {
    localStorage.setItem('aboutImage', JSON.stringify(DEFAULT_ABOUT_IMAGE))
  }
}

const getSamplePhotosForCategory = (category: string): Photo[] => {
  const sampleData = [
    { url: 'https://picsum.photos/600/600?random=1', alt: 'Beautiful Indian Wedding Ceremony', category: 'weddings' },
    { url: 'https://picsum.photos/600/600?random=2', alt: 'Traditional Wedding Rituals', category: 'weddings' },
    { url: 'https://picsum.photos/600/600?random=3', alt: 'Bride and Groom Portrait', category: 'weddings' },
    { url: 'https://picsum.photos/600/600?random=4', alt: 'Romantic Pre-wedding Shoot', category: 'pre-wedding' },
    { url: 'https://picsum.photos/600/600?random=5', alt: 'Couple in Nature', category: 'pre-wedding' },
    { url: 'https://picsum.photos/600/600?random=6', alt: 'Engagement Ring Ceremony', category: 'engagement' },
    { url: 'https://picsum.photos/600/600?random=7', alt: 'Engagement Celebration', category: 'engagement' },
    { url: 'https://picsum.photos/600/600?random=8', alt: 'Wedding Mandap Decoration', category: 'weddings' }
  ]
  
  return sampleData
    .filter(photo => photo.category === category)
    .map((photo, index) => ({
      id: `${category}-${index + 1}`,
      url: photo.url,
      alt: photo.alt,
      category: photo.category,
      createdAt: new Date().toISOString()
    }))
}

export const getPhotoFolders = (): PhotoFolder[] => {
  if (typeof window === 'undefined') return DEFAULT_FOLDERS
  return JSON.parse(localStorage.getItem('photoFolders') || JSON.stringify(DEFAULT_FOLDERS))
}

export const getAboutImage = (): AboutImage => {
  if (typeof window === 'undefined') return DEFAULT_ABOUT_IMAGE
  return JSON.parse(localStorage.getItem('aboutImage') || JSON.stringify(DEFAULT_ABOUT_IMAGE))
}

export const addPhotoToFolder = (folderId: string, photo: Omit<Photo, 'id' | 'createdAt'>): void => {
  if (typeof window === 'undefined') return
  
  const folders = getPhotoFolders()
  const folderIndex = folders.findIndex(f => f.id === folderId)
  
  if (folderIndex !== -1) {
    const newPhoto: Photo = {
      ...photo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    folders[folderIndex].photos.push(newPhoto)
    localStorage.setItem('photoFolders', JSON.stringify(folders))
  }
}

export const deletePhotoFromFolder = (folderId: string, photoId: string): void => {
  if (typeof window === 'undefined') return
  
  const folders = getPhotoFolders()
  const folderIndex = folders.findIndex(f => f.id === folderId)
  
  if (folderIndex !== -1) {
    folders[folderIndex].photos = folders[folderIndex].photos.filter(p => p.id !== photoId)
    localStorage.setItem('photoFolders', JSON.stringify(folders))
  }
}

export const updateAboutImage = (image: Omit<AboutImage, 'id' | 'updatedAt'>): void => {
  if (typeof window === 'undefined') return
  
  const updatedImage: AboutImage = {
    ...image,
    id: 'about-main',
    updatedAt: new Date().toISOString()
  }
  
  localStorage.setItem('aboutImage', JSON.stringify(updatedImage))
}

export const getAllPhotos = (): Photo[] => {
  const folders = getPhotoFolders()
  return folders.flatMap(folder => folder.photos)
}

export const getRandomPhotos = (count: number = 6): Photo[] => {
  const allPhotos = getAllPhotos()
  const shuffled = allPhotos.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const createFolder = (name: string): void => {
  if (typeof window === 'undefined') return
  
  const folders = getPhotoFolders()
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-')
  
  // Check if folder already exists
  if (folders.find(f => f.id === id)) return
  
  const newFolder: PhotoFolder = {
    id,
    name,
    photos: [],
    createdAt: new Date().toISOString()
  }
  
  folders.push(newFolder)
  localStorage.setItem('photoFolders', JSON.stringify(folders))
}

export const deleteFolder = (folderId: string): void => {
  if (typeof window === 'undefined') return
  
  const folders = getPhotoFolders()
  const updatedFolders = folders.filter(f => f.id !== folderId)
  localStorage.setItem('photoFolders', JSON.stringify(updatedFolders))
}

export const resetPhotosDB = (): void => {
  if (typeof window === 'undefined') return
  
  // Clear existing data
  localStorage.removeItem('photoFolders')
  localStorage.removeItem('aboutImage')
  
  // Reinitialize with fresh data
  initializePhotosDB()
}