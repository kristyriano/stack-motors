// Keeps the JWT returned by /auth/signin in sessionStorage
const KEY = 'stackmotors_jwt'

const auth = {
  isAuthenticated() {
    try {
      const data = sessionStorage.getItem(KEY)
      return data ? JSON.parse(data) : false
    } catch {
      return false
    }
  },
  authenticate(jwt) {
    sessionStorage.setItem(KEY, JSON.stringify(jwt))
  },
  clearJWT() {
    sessionStorage.removeItem(KEY)
  },
}

export default auth
