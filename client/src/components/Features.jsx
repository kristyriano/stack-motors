const features = [
  { icon: '＋', title: 'Add vehicles', text: 'Create a listing with make, model, year, mileage, price, condition and VIN.' },
  { icon: '✎', title: 'Keep it up to date', text: 'Edit prices, change the status to Reserved or Sold, or remove a listing.' },
  { icon: '⌕', title: 'Find cars fast', text: 'Search the inventory by make, model or year and filter by status.' },
  { icon: '🔒', title: 'Secure accounts', text: 'Sign in with your own account. Only authorized users can change listings.' },
]

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <p className="eyebrow">What you can do</p>
        <h2>Built for managing a used car lot</h2>
        <div className="features">
          {features.map((f) => (
            <article key={f.title} className="feature">
              <span className="feature__icon" aria-hidden="true">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
