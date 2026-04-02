import { Link } from 'react-router-dom'
import './Home.css'
import React from 'react'
const DESTINATIONS = [
  { name: 'Jaipur',    region: 'Rajasthan',    emoji: '🏯', value: 'Jaipur'    },
  { name: 'Goa',       region: 'Beaches',       emoji: '🏖️', value: 'Goa'       },
  { name: 'Varanasi',  region: 'Uttar Pradesh', emoji: '🪔', value: 'Varanasi'  },
  { name: 'Munnar',    region: 'Kerala',        emoji: '🌿', value: 'Munnar'    },
  { name: 'Agra',      region: 'Uttar Pradesh', emoji: '🕌', value: 'Agra'      },
  { name: 'Udaipur',   region: 'Rajasthan',     emoji: '🏰', value: 'Udaipur'   },
]

const FEATURES = [
  { icon: '⏱️', title: 'Time Optimisation',  desc: 'No overloaded days. Activities spread realistically so you never feel rushed.' },
  { icon: '🗺️', title: 'Geo Clustering',     desc: 'Nearby attractions grouped together to cut down on unnecessary travel time.' },
  { icon: '🌦️', title: 'Seasonal Suitability',desc: 'Recommendations adapt to your travel month for the best possible experience.' },
  { icon: '🔢', title: 'Smart Sequencing',   desc: 'Logical ordering of places so your journey flows naturally each day.' },
]

const STEPS = [
  { num: '01', icon: '📍', title: 'Pick Your Destination', desc: 'Choose from our curated list of Indian cities and popular tourist hubs.' },
  { num: '02', icon: '📅', title: 'Set Travel Dates',      desc: 'Enter your start and return date — TripNest calculates the exact duration.' },
  { num: '03', icon: '🗺️', title: 'Get Your Itinerary',   desc: 'Receive a smart, clustered day-by-day plan optimised for time, distance & season.' },
]

export default function Home() {
  return (
    <main className="home">

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero__bg">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
          <div className="hero__grid" />
        </div>

        <div className="hero__content fade-up">
          <p className="eyebrow">✦ India's smartest travel planner</p>
          <h1 className="hero__title">
            Your perfect trip,<br />
            <em>crafted in seconds.</em>
          </h1>
          <p className="hero__desc">
            Tell us where you want to go and when — TripNest builds a practical,
            day-by-day itinerary tailored to your travel window.
          </p>
          <div className="hero__actions">
            <Link to="/plan" className="btn btn-primary btn-lg">Plan My Trip →</Link>
            <Link to="/destinations" className="btn btn-ghost btn-lg">Explore Destinations</Link>
          </div>
          <div className="hero__stats">
            <div>
              <div className="hero__stat-num">26+</div>
              <div className="hero__stat-label">Destinations</div>
            </div>
            <div>
              <div className="hero__stat-num">200+</div>
              <div className="hero__stat-label">Attractions mapped</div>
            </div>
            <div>
              <div className="hero__stat-num">2–5</div>
              <div className="hero__stat-label">Day trip support</div>
            </div>
          </div>
        </div>

        <div className="hero__visual fade-up delay-2">
          <div className="card-stack">
            <div className="itin-card itin-card--back" />
            <div className="itin-card itin-card--mid" />
            <div className="itin-card itin-card--front">
              <div className="itin-card__header">
                <span className="itin-card__dest">🏯 Jaipur, Rajasthan</span>
                <span className="itin-card__days">3 Days</span>
              </div>
              {[
                { day: 'Day 1', items: ['✦ Amber Fort', '✦ Nahargarh Fort', '✦ City Palace'] },
                { day: 'Day 2', items: ['✦ Hawa Mahal', '✦ Jantar Mantar', '✦ Johri Bazaar'] },
                { day: 'Day 3', items: ['✦ Jal Mahal', '✦ Albert Hall Museum'] },
              ].map(d => (
                <div className="itin-card__day" key={d.day}>
                  <span className="itin-card__label">{d.day}</span>
                  <ul>{d.items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── HOW IT WORKS ── */}
      <section className="section how">
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>Simple as 1-2-3</p>
          <h2 className="section-title">How TripNest Works</h2>
          <div className="steps">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="step">
                  <div className="step__num">{s.num}</div>
                  <div className="step__icon">{s.icon}</div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__desc">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && <div className="step__arrow" key={`arr-${i}`}>→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section section--alt features">
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>Why TripNest</p>
          <h2 className="section-title">Built for Real Travellers</h2>
          <div className="features__grid">
            {FEATURES.map(f => (
              <div className="feature-card" key={f.title}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS STRIP ── */}
      <section className="section dest-strip">
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>Featured Destinations</p>
          <h2 className="section-title">Explore India's Finest</h2>
          <div className="dest-cards">
            {DESTINATIONS.map(d => (
              <Link to={`/plan?dest=${d.value}`} className="dest-card" key={d.name}>
                <div className="dest-card__emoji">{d.emoji}</div>
                <h3>{d.name}</h3>
                <span>{d.region}</span>
              </Link>
            ))}
            <Link to="/destinations" className="dest-card dest-card--more">
              <div className="dest-card__emoji" style={{ color: 'var(--terracotta)' }}>＋</div>
              <h3>More</h3>
              <span>See all destinations</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to explore India?</h2>
          <p>Start with a destination and your dates — the rest is on us.</p>
          <Link to="/plan" className="btn btn-white btn-lg">Plan My Trip Now →</Link>
        </div>
      </section>

    </main>
  )
}
