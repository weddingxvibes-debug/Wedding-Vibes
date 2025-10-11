'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCalendarEvents, initializeCalendarDB, type CalendarEvent } from '@/lib/calendar-db'
import MobileLayout from '@/components/admin/MobileLayout'

export default function CalendarPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      initializeCalendarDB()
      setEvents(getCalendarEvents())
    } else {
      router.push('/admin')
    }
  }, [router])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date === dateStr)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  const days = getDaysInMonth(currentDate)

  return (
    <MobileLayout activeTab="calendar">
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Calendar</h2>
          <p className="text-gray-400 text-sm sm:text-base">Manage your photography schedule</p>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
                className="p-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition-all"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm transition-all"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
                className="p-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition-all"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="p-2 h-20"></div>
              }

              const dayEvents = getEventsForDate(day)
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

              return (
                <div
                  key={`${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`}
                  className={`p-1 h-20 border border-gray-700/50 rounded-lg hover:bg-gray-700/20 transition-all cursor-pointer ${
                    isToday ? 'bg-purple-600/20 border-purple-500/50' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-purple-300' : 'text-gray-300'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs px-1 py-0.5 rounded truncate ${
                          event.type === 'shoot' ? 'bg-green-600/30 text-green-300' :
                          event.type === 'meeting' ? 'bg-blue-600/30 text-blue-300' :
                          'bg-gray-600/30 text-gray-300'
                        }`}
                      >
                        {event.time} {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}