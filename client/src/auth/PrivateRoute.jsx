import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

// Sends signed-out users to the sign in page and back here afterwards
export default function PrivateRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/signin" replace state={{ from: location }} />
  return children
}
