const API_BASE = '/api'

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token')
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config)
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}

export const bookingAPI = {
  create: (data: any) => apiCall('/bookings', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  getAll: () => apiCall('/bookings')
}

export const photoAPI = {
  getAll: () => apiCall('/photos'),
  
  upload: (data: any) => apiCall('/photos', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}