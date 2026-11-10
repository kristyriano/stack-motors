import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup, signin } from '../api/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Signup() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (values.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    try {
      await signup(values)
      const data = await signin({ email: values.email, password: values.password })
      login(data)
      navigate('/inventory')
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
          <p className="eyebrow">Join Stack Motors</p>
          <h1>Create an account</h1>
          {error && <p className="alert" role="alert">{error}</p>}
          <label>Full name
            <input name="name" value={values.name} onChange={handleChange} autoComplete="name" required />
          </label>
          <label>Email
            <input type="email" name="email" value={values.email} onChange={handleChange} autoComplete="email" required />
          </label>
          <label>Password <small>(at least 6 characters)</small>
            <input type="password" name="password" value={values.password} onChange={handleChange} autoComplete="new-password" required />
          </label>
          <button className="btn btn--primary btn--lg" disabled={loading}>{loading ? 'Creating account…' : 'Create account'}</button>
          <p className="form__alt">Already have an account? <Link to="/signin">Sign in</Link></p>
        </form>
      </div>
    </section>
  )
}
