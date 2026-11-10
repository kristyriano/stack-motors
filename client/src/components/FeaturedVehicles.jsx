import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VehicleCard from './VehicleCard.jsx'
import { listVehicles } from '../api/api.js'
import { featuredVehicles } from '../data/vehicles.js'

// Shows the 3 newest available vehicles from the API; falls back to sample cars
export default function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState(featuredVehicles)

  useEffect(() => {
    listVehicles('?status=Available')
      .then((data) => { if (data.length) setVehicles(data.slice(0, 3)) })
      .catch(() => { /* API offline: keep the sample cars */ })
  }, [])

  return (
    <section className="section section--tint">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Fresh on the lot</p>
            <h2>Featured vehicles</h2>
          </div>
          <Link to="/inventory" className="link-arrow">View all inventory →</Link>
        </div>
        <div className="cars">
          {vehicles.map((v) => <VehicleCard key={v._id || v.id} vehicle={v} />)}
        </div>
      </div>
    </section>
  )
}
