// Navbar.jsx
import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  // accessing authentication context
  const auth = useContext(AuthContext)

  // Logout handler function
  const logoutHandler = () => {
    // event.preventDefault();
    auth.logout()
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Link Shortening</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/links">Links</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Log out</a></li>
        </ul>
      </div>
    </nav>
  )
}
