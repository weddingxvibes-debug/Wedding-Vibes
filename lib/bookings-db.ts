export type BookingStatus = 'pending' | 'approved' | 'rejected'

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  message: string
  status: BookingStatus
  createdAt: string
}

export const initializeBookingsDB = () => {
  if (typeof window === 'undefined') return
  
  const existingBookings = localStorage.getItem('bookings')
  if (!existingBookings) {
    localStorage.setItem('bookings', JSON.stringify([]))
  }
}

export const getBookings = (): Booking[] => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('bookings') || '[]')
}

export const addBooking = (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): void => {
  if (typeof window === 'undefined') return
  
  const bookings = getBookings()
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  
  bookings.push(newBooking)
  localStorage.setItem('bookings', JSON.stringify(bookings))
}

export const updateBookingStatus = (id: string, status: BookingStatus): void => {
  if (typeof window === 'undefined') return
  
  const bookings = getBookings()
  const updatedBookings = bookings.map(booking =>
    booking.id === id ? { ...booking, status } : booking
  )
  
  localStorage.setItem('bookings', JSON.stringify(updatedBookings))
}