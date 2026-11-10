import { createContext, useContext, useState } from 'react'
import auth from './auth-helper.js'
import { signout as apiSignout } from '../api/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(auth.isAuthenticated())

  const login = (jwt) => {
    auth.authenticate(jwt)
    setSession(jwt)
  }

  const logout = async () => {
    auth.clearJWT()
    setSession(false)
    try { await apiSignout() } catch { /* the token is already removed */ }
  }

  return (
    <AuthContext.Provider value={{ user: session ? session.user : null, token: session ? session.token : null, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
