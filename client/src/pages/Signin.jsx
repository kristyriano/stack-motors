import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signin } from '../api/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Signin() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/inventory'

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await signin(values)
      login(data)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section page">
      <div className="container narrow">
        <form className="card form" onSubmit={handleSubmit} noValidate>
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in</h1>
          {error && <p className="alert" role="alert">{error}</p>}
          <label>Email
            <input type="email" name="email" value={values.email} onChange={handleChange} autoComplete="email" required />
          </label>
          <label>Password
            <input type="password" name="password" value={values.password} onChange={handleChange} autoComplete="current-password" required />
          </label>
          <button className="btn btn--primary btn--lg" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
          <p className="form__alt">New to Stack Motors? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </section>
  )
}
