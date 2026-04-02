import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const location = useLocation()
  const isDark = location.pathname === '/plan'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <nav className={`navbar ${isDark ? 'navbar--dark' : ''} ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🪺</span>
          TripNest
        </NavLink>

        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          {[['/', 'Home'], ['/plan', 'Plan Trip'], ['/destinations', 'Destinations'], ['/about', 'About']].map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink to="/plan" className="btn btn-primary" style={{ fontSize: '.82rem', padding: '.42em 1.1em' }}>
          Start Planning
        </NavLink>

        <button
          className={`navbar__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
