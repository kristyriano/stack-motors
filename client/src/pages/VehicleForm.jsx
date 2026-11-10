import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createVehicle, readVehicle, updateVehicle } from '../api/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

const EMPTY = { make: '', model: '', year: '', mileage: '', price: '', vin: '', color: '',
  fuelType: 'Gas', transmission: 'Automatic', condition: 'Good', status: 'Available', description: '', imageUrl: '' }

// One form for both "Add vehicle" and "Edit vehicle"
export default function VehicleForm() {
  const { vehicleId } = useParams()
  const isEdit = Boolean(vehicleId)
  const { token } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState(EMPTY)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    readVehicle(vehicleId)
      .then((v) => setValues({ ...EMPTY, ...Object.fromEntries(Object.keys(EMPTY).map((k) => [k, v[k] ?? ''])) }))
      .catch((err) => setError(err.message))
  }, [isEdit, vehicleId])

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const payload = { ...values, year: Number(values.year), mileage: Number(values.mileage), price: Number(values.price) }
    if (!payload.make || !payload.model || !payload.year || values.mileage === '' || values.price === '') {
      return setError('Make, model, year, mileage and price are required.')
    }
    setSaving(true)
    try {
      if (isEdit) await updateVehicle(vehicleId, payload, token)
      else await createVehicle(payload, token)
      navigate('/inventory')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const select = (name, options) => (
    <select name={name} value={values[name]} onChange={handleChange}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  )

  return (
    <section className="section page">
      <div className="container mid">
        <form className="card form" onSubmit={handleSubmit} noValidate>
          <p className="eyebrow">{isEdit ? 'Update listing' : 'New listing'}</p>
          <h1>{isEdit ? 'Edit vehicle' : 'Add a vehicle'}</h1>
          {error && <p className="alert" role="alert">{error}</p>}
          <div className="grid2">
            <label>Make *<input name="make" value={values.make} onChange={handleChange} placeholder="Toyota" required /></label>
            <label>Model *<input name="model" value={values.model} onChange={handleChange} placeholder="Corolla LE" required /></label>
            <label>Year *<input type="number" name="year" value={values.year} onChange={handleChange} placeholder="2021" required /></label>
            <label>Mileage (km) *<input type="number" name="mileage" value={values.mileage} onChange={handleChange} placeholder="48200" min="0" required /></label>
            <label>Price (CAD) *<input type="number" name="price" value={values.price} onChange={handleChange} placeholder="21995" min="0" required /></label>
            <label>VIN<input name="vin" value={values.vin} onChange={handleChange} placeholder="17 characters" /></label>
            <label>Color<input name="color" value={values.color} onChange={handleChange} placeholder="Silver" /></label>
            <label>Fuel type{select('fuelType', ['Gas', 'Diesel', 'Hybrid', 'Electric'])}</label>
            <label>Transmission{select('transmission', ['Automatic', 'Manual'])}</label>
            <label>Condition{select('condition', ['Excellent', 'Good', 'Fair'])}</label>
            <label>Status{select('status', ['Available', 'Reserved', 'Sold'])}</label>
            <label>Image URL<input name="imageUrl" value={values.imageUrl} onChange={handleChange} placeholder="https://…" /></label>
          </div>
          <label>Description<textarea name="description" rows="3" value={values.description} onChange={handleChange} placeholder="One owner, clean history…" /></label>
          <div className="form__actions">
            <Link to="/inventory" className="btn btn--ghost">Cancel</Link>
            <button className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add vehicle'}</button>
          </div>
        </form>
      </div>
    </section>
  )
}
