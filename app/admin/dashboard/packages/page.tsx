'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getPackages, initializePackagesDB, updatePackage, type Package } from '@/lib/packages-db'
import MobileLayout from '@/components/admin/MobileLayout'

export default function PackagesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [packages, setPackages] = useState<Package[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      initializePackagesDB()
      loadPackages()
    } else {
      router.push('/admin')
    }
  }, [router])

  const loadPackages = () => {
    setPackages(getPackages())
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <MobileLayout activeTab="packages">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Photography Packages</h2>
            <p className="text-gray-400 text-sm sm:text-base">Manage your service packages and pricing</p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600/20 text-green-400 rounded-xl font-medium border border-green-600/30 hover:bg-green-600/30 transition-all flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add Package</span>
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`bg-gray-800/30 backdrop-blur-lg border rounded-2xl p-6 relative ${
              pkg.popular ? 'border-purple-500/50 ring-2 ring-purple-500/20' : 'border-gray-700'
            }`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-purple-400 mb-1">{pkg.price}</div>
                <div className="text-gray-400 text-sm">{pkg.duration} coverage</div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Deliverables:</h4>
                  <ul className="space-y-1">
                    {pkg.deliverables.map((item, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center">
                        <span className="text-blue-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPackage(pkg)}
                  className="flex-1 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium border border-blue-600/30 hover:bg-blue-600/30 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    updatePackage(pkg.id, { active: !pkg.active })
                    loadPackages()
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    pkg.active 
                      ? 'bg-red-600/20 text-red-400 border-red-600/30 hover:bg-red-600/30'
                      : 'bg-green-600/20 text-green-400 border-green-600/30 hover:bg-green-600/30'
                  }`}
                >
                  {pkg.active ? 'Disable' : 'Enable'}
                </button>
              </div>
              
              {!pkg.active && (
                <div className="absolute inset-0 bg-gray-900/50 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-400 font-semibold">Disabled</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}