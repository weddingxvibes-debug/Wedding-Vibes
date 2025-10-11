'use client'

export default function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-purple-600 ${sizeClasses[size]} ${className}`}></div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin mx-auto" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
        </div>
        <p className="text-gray-400 animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 lg:p-6 animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  )
}