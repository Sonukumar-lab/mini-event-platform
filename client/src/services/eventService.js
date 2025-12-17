import api from './api'


export const getEvents = () => api.get('/events')
export const createEvent = (data) => api.post('/events', data)
export const getEvent = (id) => api.get(`/events/${id}`)