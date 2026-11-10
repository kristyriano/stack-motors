import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listVehicles, deleteVehicle } from '../api/api.js'
import { useAuth } from '../auth/AuthContext.jsx'
import VehicleCard from '../components/VehicleCard.jsx'

const STATUSES = ['All', 'Available', 'Reserved', 'Sold']

export default function Inventory() {
  const { user, token } = useAuth()
  const [vehicles, setVehicles] = useState([])
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    listVehicles(status === 'All' ? '' : `?status=${status}`)
      .then((data) => active && setVehicles(data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [status])

  const handleDelete = async (vehicle) => {
    if (!window.confirm(`Delete the ${vehicle.year} ${vehicle.make} ${vehicle.model}?`)) return
    try {
      await deleteVehicle(vehicle._id, token)
      setVehicles((list) => list.filter((v) => v._id !== vehicle._id))
    } catch (err) {
      setError(err.message)
    }
  }

  const term = search.trim().toLowerCase()
  const shown = vehicles.filter((v) => !term || `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(term))
  const canEdit = (v) => user && (user.role === 'admin' || v.owner?._id === user._id)

  return (
    <section className="section page">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Inventory</p>
            <h1>All vehicles</h1>
          </div>
          {user
            ? <Link to="/vehicles/new" className="btn btn--primary">+ Add vehicle</Link>
            : <Link to="/signin" className="btn btn--ghost">Sign in to add vehicles</Link>}
        </div>

        <div className="toolbar">
          <input type="search" placeholder="Search make, model or year" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search vehicles" />
          <div className="chips" role="group" aria-label="Filter by status">
            {STATUSES.map((s) => (
              <button key={s} type="button" className={`chip ${status === s ? 'chip--on' : ''}`} onClick={() => setStatus(s)}>{s}</button>
            ))}
          </div>
        </div>

        {error && <p className="alert" role="alert">{error}</p>}
        {loading ? (
          <p className="muted">Loading vehicles…</p>
        ) : shown.length === 0 ? (
          <div className="empty">
            <h3>No vehicles yet</h3>
            <p className="muted">{user ? 'Add the first car on your lot.' : 'Sign in to add the first car.'}</p>
          </div>
        ) : (
          <div className="cars">
            {shown.map((v) => (
              <VehicleCard key={v._id} vehicle={v}>
                {canEdit(v) && (
                  <div className="car__actions">
                    <Link to={`/vehicles/${v._id}/edit`} className="btn btn--ghost btn--sm">Edit</Link>
                    <button type="button" className="btn btn--danger btn--sm" onClick={() => handleDelete(v)}>Delete</button>
                  </div>
                )}
              </VehicleCard>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
