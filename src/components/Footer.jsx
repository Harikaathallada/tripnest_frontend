import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🪺 TripNest</span>
          <p>Smart itinerary planning for Indian travel.</p>
        </div>
        <div className="footer__links">
          <Link to="/plan">Plan a Trip</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/about">About</Link>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} TripNest Beta. Built with ♥ for curious travellers.</p>
      </div>
    </footer>
  )
}
