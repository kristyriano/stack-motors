import logo from '../assets/logo-mark.svg'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="brand brand--light">
          <img src={logo} alt="" width="34" height="34" />
          <span className="brand__name">STACK <b>MOTORS</b></span>
        </div>
        <p>
          COMP229 Web Application Development · Centennial College · Team Stack Motors
          <br />© {new Date().getFullYear()} Stack Motors. Built with MongoDB, Express, React and Node.js.
        </p>
      </div>
    </footer>
  )
}
