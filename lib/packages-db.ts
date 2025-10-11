export interface Package {
  id: string
  name: string
  price: string
  duration: string
  deliverables: string[]
  features: string[]
  popular: boolean
  active: boolean
  createdAt: string
  updatedAt: string
}

const SAMPLE_PACKAGES: Package[] = [
  {
    id: '1',
    name: 'Basic Wedding Package',
    price: '₹50,000',
    duration: '6 hours',
    deliverables: ['300+ edited photos', 'Online gallery', 'USB drive'],
    features: ['1 photographer', 'Basic editing', '2 weeks delivery'],
    popular: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Premium Wedding Package',
    price: '₹1,20,000',
    duration: '10 hours',
    deliverables: ['500+ edited photos', 'Highlight video', 'Premium album', 'Online gallery', 'USB drive'],
    features: ['2 photographers', 'Advanced editing', 'Same day highlights', '1 week delivery'],
    popular: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Luxury Wedding Package',
    price: '₹2,00,000',
    duration: '12 hours',
    deliverables: ['800+ edited photos', 'Cinematic video', 'Premium album', 'Canvas prints', 'Online gallery', 'USB drive'],
    features: ['3 photographers', 'Drone coverage', 'Premium editing', 'Same day edit', '3 days delivery'],
    popular: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const initializePackagesDB = () => {
  if (typeof window === 'undefined') return
  
  const existingPackages = localStorage.getItem('packages')
  if (!existingPackages) {
    localStorage.setItem('packages', JSON.stringify(SAMPLE_PACKAGES))
  }
}

export const getPackages = (): Package[] => {
  if (typeof window === 'undefined') return SAMPLE_PACKAGES
  return JSON.parse(localStorage.getItem('packages') || JSON.stringify(SAMPLE_PACKAGES))
}

export const addPackage = (pkg: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): void => {
  if (typeof window === 'undefined') return
  
  const packages = getPackages()
  const newPackage: Package = {
    ...pkg,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  packages.push(newPackage)
  localStorage.setItem('packages', JSON.stringify(packages))
}

export const updatePackage = (id: string, updates: Partial<Package>): void => {
  if (typeof window === 'undefined') return
  
  const packages = getPackages()
  const packageIndex = packages.findIndex(p => p.id === id)
  
  if (packageIndex !== -1) {
    packages[packageIndex] = {
      ...packages[packageIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('packages', JSON.stringify(packages))
  }
}

export const deletePackage = (id: string): void => {
  if (typeof window === 'undefined') return
  
  const packages = getPackages()
  const updatedPackages = packages.filter(p => p.id !== id)
  localStorage.setItem('packages', JSON.stringify(updatedPackages))
}