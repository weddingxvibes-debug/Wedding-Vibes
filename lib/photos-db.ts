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
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop', alt: 'Beautiful Indian Wedding Ceremony', category: 'weddings' },
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=600&fit=crop', alt: 'Traditional Wedding Rituals', category: 'weddings' },
    { url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=600&fit=crop', alt: 'Bride and Groom Portrait', category: 'weddings' },
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=600&fit=crop', alt: 'Romantic Pre-wedding Shoot', category: 'pre-wedding' },
    { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=600&fit=crop', alt: 'Couple in Nature', category: 'pre-wedding' },
    { url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop', alt: 'Engagement Ring Ceremony', category: 'engagement' },
    { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=600&fit=crop', alt: 'Engagement Celebration', category: 'engagement' },
    { url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=600&fit=crop', alt: 'Wedding Mandap Decoration', category: 'weddings' }
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