import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

/** Fetch all destinations, optionally filtered by region */
export const fetchDestinations = (region = '') =>
  api.get('/destinations', { params: region ? { region } : {} }).then(r => r.data)

/** Generate an itinerary */
export const generateItinerary = (payload) =>
  api.post('/itinerary/generate', payload).then(r => r.data)
