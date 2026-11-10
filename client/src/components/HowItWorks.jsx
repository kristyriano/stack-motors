import { Link } from 'react-router-dom'

const steps = [
  { n: '01', title: 'Create your account', text: 'Sign up with your email and a secure password.' },
  { n: '02', title: 'Add your vehicles', text: 'Enter the details of each car on your lot.' },
  { n: '03', title: 'Manage and sell', text: 'Update prices and mark cars as sold as you go.' },
]

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2>Three steps to an organized lot</h2>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.n} className="step">
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="cta-band">
          <div>
            <h2>Ready to stack up your inventory?</h2>
            <p>Join Stack Motors and keep every vehicle organized.</p>
          </div>
          <Link to="/signup" className="btn btn--primary btn--lg">Get started</Link>
        </div>
      </div>
    </section>
  )
}
