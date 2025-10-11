export interface GalleryItem {
  id: string
  title: string
  coverImage: string
  images: string[]
  category: string
  client: string
  date: string
  featured: boolean
  public: boolean
  createdAt: string
  updatedAt: string
}

const SAMPLE_GALLERIES: GalleryItem[] = [
  {
    id: '1',
    title: 'Rahul & Priya Wedding',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop'
    ],
    category: 'Wedding',
    client: 'Rahul & Priya Sharma',
    date: '2024-02-15',
    featured: true,
    public: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Amit & Sneha Pre-Wedding',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop'
    ],
    category: 'Pre-Wedding',
    client: 'Amit & Sneha Patel',
    date: '2024-01-25',
    featured: false,
    public: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const initializeGalleryDB = () => {
  if (typeof window === 'undefined') return
  
  const existingGalleries = localStorage.getItem('galleries')
  if (!existingGalleries) {
    localStorage.setItem('galleries', JSON.stringify(SAMPLE_GALLERIES))
  }
}

export const getGalleries = (): GalleryItem[] => {
  if (typeof window === 'undefined') return SAMPLE_GALLERIES
  return JSON.parse(localStorage.getItem('galleries') || JSON.stringify(SAMPLE_GALLERIES))
}

export const addGallery = (gallery: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>): void => {
  if (typeof window === 'undefined') return
  
  const galleries = getGalleries()
  const newGallery: GalleryItem = {
    ...gallery,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  galleries.push(newGallery)
  localStorage.setItem('galleries', JSON.stringify(galleries))
}

export const updateGallery = (id: string, updates: Partial<GalleryItem>): void => {
  if (typeof window === 'undefined') return
  
  const galleries = getGalleries()
  const galleryIndex = galleries.findIndex(g => g.id === id)
  
  if (galleryIndex !== -1) {
    galleries[galleryIndex] = {
      ...galleries[galleryIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('galleries', JSON.stringify(galleries))
  }
}

export const deleteGallery = (id: string): void => {
  if (typeof window === 'undefined') return
  
  const galleries = getGalleries()
  const updatedGalleries = galleries.filter(g => g.id !== id)
  localStorage.setItem('galleries', JSON.stringify(updatedGalleries))
}