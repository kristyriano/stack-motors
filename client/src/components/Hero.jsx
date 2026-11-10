import { Link } from 'react-router-dom'
import CarIllustration from './CarIllustration.jsx'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Used car inventory, simplified</p>
          <h1>Every car on your lot, <span>in one place.</span></h1>
          <p className="lead">
            Stack Motors helps dealers and sellers add, update and track used vehicles,
            from the moment a car arrives to the day it is sold.
          </p>
          <div className="hero__cta">
            <Link to="/signup" className="btn btn--primary btn--lg">Create a free account</Link>
            <Link to="/inventory" className="btn btn--light btn--lg">Browse inventory</Link>
          </div>
          <ul className="hero__stats">
            <li><strong>Add</strong> vehicles in seconds</li>
            <li><strong>Edit</strong> price &amp; status</li>
            <li><strong>Track</strong> what is sold</li>
          </ul>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card">
            <CarIllustration color="#F2622E" />
            <div className="hero__tag">
              <span>2020 Mazda CX-5 GS</span>
              <b>$24,780</b>
            </div>
          </div>
          <div className="stack-lines"><i /><i /><i /></div>
        </div>
      </div>
    </section>
  )
}
