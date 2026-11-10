import CarIllustration from './CarIllustration.jsx'

const money = (n) => Number(n).toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })
const badgeClass = { Available: '', Reserved: 'badge--warn', Sold: 'badge--sold' }
const swatch = { silver: '#C9D3DE', grey: '#8A94A3', gray: '#8A94A3', black: '#2B2F36', white: '#EEF1F5', red: '#8E1B1B', blue: '#2D5B9A', green: '#2F6F62', orange: '#F2622E' }

export default function VehicleCard({ vehicle: v, children }) {
  const color = swatch[(v.color || '').toLowerCase()] || v.color || '#C9D3DE'
  return (
    <article className="car">
      <div className="car__img">
        {v.imageUrl ? <img src={v.imageUrl} alt={`${v.year} ${v.make} ${v.model}`} /> : <CarIllustration color={color} />}
      </div>
      <div className="car__body">
        <span className={`badge ${badgeClass[v.status] || ''}`}>{v.status}</span>
        <h3>{v.year} {v.make} {v.model}</h3>
        <p className="car__meta">{Number(v.mileage).toLocaleString('en-CA')} km · {v.fuelType} · {v.transmission}</p>
        <p className="car__price">{money(v.price)}</p>
        {children}
      </div>
    </article>
  )
}
