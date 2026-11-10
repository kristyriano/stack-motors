// Small wrapper around fetch for the Stack Motors API
const request = async (path, { method = 'GET', body, token } = {}) => {
  const headers = { Accept: 'application/json' }
  if (body) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

// Users and auth
export const signup = (user) => request('/api/users', { method: 'POST', body: user })
export const signin = (credentials) => request('/auth/signin', { method: 'POST', body: credentials })
export const signout = () => request('/auth/signout')

// Vehicles
export const listVehicles = (query = '') => request(`/api/vehicles${query}`)
export const readVehicle = (id) => request(`/api/vehicles/${id}`)
export const createVehicle = (vehicle, token) => request('/api/vehicles', { method: 'POST', body: vehicle, token })
export const updateVehicle = (id, vehicle, token) => request(`/api/vehicles/${id}`, { method: 'PUT', body: vehicle, token })
export const deleteVehicle = (id, token) => request(`/api/vehicles/${id}`, { method: 'DELETE', token })
