import api from './api'


export const joinEvent = (id) => api.post(`/rsvp/${id}`)