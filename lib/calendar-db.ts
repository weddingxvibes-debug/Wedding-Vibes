export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: 'shoot' | 'meeting' | 'delivery' | 'other'
  client: string
  location: string
  status: 'confirmed' | 'tentative' | 'completed'
  notes?: string
  createdAt: string
  updatedAt: string
}

const SAMPLE_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Pre-Wedding Shoot',
    date: '2024-01-25',
    time: '10:00',
    type: 'shoot',
    client: 'Amit & Sneha Patel',
    location: 'Mhow, Indore',
    status: 'confirmed',
    notes: 'Outdoor location, bring extra batteries',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Client Meeting',
    date: '2024-01-28',
    time: '15:00',
    type: 'meeting',
    client: 'Rahul & Priya Sharma',
    location: 'Office',
    status: 'confirmed',
    notes: 'Discuss wedding package details',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const initializeCalendarDB = () => {
  if (typeof window === 'undefined') return
  
  const existingEvents = localStorage.getItem('calendarEvents')
  if (!existingEvents) {
    localStorage.setItem('calendarEvents', JSON.stringify(SAMPLE_EVENTS))
  }
}

export const getCalendarEvents = (): CalendarEvent[] => {
  if (typeof window === 'undefined') return SAMPLE_EVENTS
  return JSON.parse(localStorage.getItem('calendarEvents') || JSON.stringify(SAMPLE_EVENTS))
}

export const addCalendarEvent = (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): void => {
  if (typeof window === 'undefined') return
  
  const events = getCalendarEvents()
  const newEvent: CalendarEvent = {
    ...event,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  events.push(newEvent)
  localStorage.setItem('calendarEvents', JSON.stringify(events))
}

export const updateCalendarEvent = (id: string, updates: Partial<CalendarEvent>): void => {
  if (typeof window === 'undefined') return
  
  const events = getCalendarEvents()
  const eventIndex = events.findIndex(e => e.id === id)
  
  if (eventIndex !== -1) {
    events[eventIndex] = {
      ...events[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('calendarEvents', JSON.stringify(events))
  }
}

export const deleteCalendarEvent = (id: string): void => {
  if (typeof window === 'undefined') return
  
  const events = getCalendarEvents()
  const updatedEvents = events.filter(e => e.id !== id)
  localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents))
}