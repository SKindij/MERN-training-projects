// Public.jsx
import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to <span className="nowrap">Tech Notes App!</span></h1>
      </header>
      <main className="public__main">
        <p>Located in Beautiful Downtown Foo City</p>
        <address className="public__addr">
            Dan D. Repairs<br />
            555 Foo Drive<br />
            Foo City, CA 12345<br />
            <a href="tel:+15557775555">(555) 777-5555</a>
        </address>
          <br />
        <p>Owner: San Domingo</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  )
  return content
}
export default Public
