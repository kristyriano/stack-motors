import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section page">
      <div className="container narrow">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn--primary">Back to home</Link>
      </div>
    </section>
  )
}
