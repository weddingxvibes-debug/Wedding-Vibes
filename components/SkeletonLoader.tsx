'use client'

interface SkeletonLoaderProps {
  count?: number
  className?: string
}

export default function SkeletonLoader({ count = 8, className = "" }: SkeletonLoaderProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="aspect-square bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg overflow-hidden animate-pulse"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '2s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary-50/50 via-pink-50/30 to-gold-50/50 dark:from-gray-700/50 dark:via-purple-900/30 dark:to-gray-600/50 animate-pulse">
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" 
                   style={{ animationDelay: `${index * 0.2}s` }}>
                <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 m-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}