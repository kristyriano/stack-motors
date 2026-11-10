import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-mark.svg'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleSignout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="brand" aria-label="Stack Motors home">
          <img src={logo} alt="Stack Motors logo" width="40" height="40" />
          <span className="brand__name">STACK <b>MOTORS</b></span>
        </Link>
        <nav className="nav__links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/inventory">Inventory</NavLink>
          {user && <NavLink to="/vehicles/new">Add vehicle</NavLink>}
        </nav>
        <div className="nav__actions">
          {user ? (
            <>
              <span className="nav__user">Hi, {user.name.split(' ')[0]}</span>
              <button type="button" className="btn btn--ghost" onClick={handleSignout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn--ghost">Sign in</Link>
              <Link to="/signup" className="btn btn--primary">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
