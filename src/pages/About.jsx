import { Link } from 'react-router-dom'
import './About.css'

const FEATURES = [
  { icon: '⏱️', title: 'Time Optimisation',    desc: 'No overloaded days. Activities spread realistically so you are never rushed.' },
  { icon: '🗺️', title: 'Geo Clustering',       desc: 'Nearby attractions grouped per day to reduce unnecessary intra-city travel.' },
  { icon: '🌦️', title: 'Seasonal Filters',     desc: 'Recommendations adapt based on your travel dates and the season of the year.' },
  { icon: '📐', title: 'Logical Sequencing',   desc: 'Each day follows a natural order so the journey flows smoothly from start to finish.' },
]

const TECH = [
  { icon: '⚛️',  name: 'React 18',        role: 'Frontend UI' },
  { icon: '⚡',  name: 'Vite',            role: 'Build tool' },
  { icon: '☕',  name: 'Java 17',         role: 'Backend language' },
  { icon: '🌱',  name: 'Spring Boot 3',   role: 'REST API framework' },
  { icon: '🗄️',  name: 'MySQL',           role: 'Destination database' },
  { icon: '🔗',  name: 'Spring Data JPA', role: 'ORM & data layer' },
  { icon: '🐦',  name: 'Lombok',          role: 'Boilerplate reduction' },
  { icon: '🔄',  name: 'Axios',           role: 'HTTP client' },
]

const ROADMAP = [
  { done: true,  title: 'Beta Release',          desc: 'Rule-based itinerary generation for 26 Indian destinations supporting 2–5 day trips.' },
  { done: false, title: 'AI Personalisation',    desc: 'ML models to tailor recommendations based on user travel preferences and history.' },
  { done: false, title: 'Live API Integrations', desc: 'Real-time weather, transport pricing, and hotel availability from external APIs.' },
  { done: false, title: 'Budget Filtering',      desc: 'Plan within your budget with smart cost-aware attraction and hotel recommendations.' },
  { done: false, title: 'User Accounts',         desc: 'Save, share, and revisit your past itineraries from any device.' },
  { done: false, title: 'Global Expansion',      desc: 'Extend TripNest beyond India to support worldwide travel planning.' },
]

export default function About() {
  return (
    <main>
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">The story behind the nest</p>
          <h1>About TripNest</h1>
        </div>
      </div>

      {/* What is TripNest */}
      <section className="section">
        <div className="container about-intro">
          <div className="about-text">
            <h2>What is TripNest?</h2>
            <p>
              TripNest is a web-based travel itinerary generation system built to help travellers
              plan short trips within India with zero hassle. You provide a destination, a start
              date, and a return date — TripNest does the rest.
            </p>
            <p>
              The platform computes your trip duration and generates a practical, optimised
              day-by-day plan using a structured database of Indian destinations, grouped and
              sequenced intelligently using a rule-based algorithm.
            </p>
            <p>
              This is the <strong>Beta Version</strong> — it currently supports 2–5 day trips
              across 26 curated Indian destinations, with 200+ attractions mapped across the
              country.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat__num">26</span>
                <span className="about-stat__label">Destinations</span>
              </div>
              <div className="about-stat">
                <span className="about-stat__num">200+</span>
                <span className="about-stat__label">Attractions</span>
              </div>
              <div className="about-stat">
                <span className="about-stat__num">5</span>
                <span className="about-stat__label">Regions covered</span>
              </div>
            </div>
          </div>

          <div className="about-feature-cards">
            {FEATURES.map(f => (
              <div className="about-fcard" key={f.title}>
                <div className="about-fcard__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--alt">
        <div className="container">
          <p className="eyebrow">The algorithm</p>
          <h2 className="about-section-title">How TripNest Builds Your Plan</h2>
          <div className="algo-steps">
            {[
              { num:'01', title:'Duration Calculation',    desc:'The system computes exact trip duration from your start and return dates.' },
              { num:'02', title:'Seasonal Filtering',      desc:'Attractions are filtered based on your travel month to ensure relevance and quality.' },
              { num:'03', title:'Geo Clustering',          desc:'Attractions are grouped into geographic clusters to minimise intra-day travel.' },
              { num:'04', title:'Time-slot Assignment',    desc:'Each activity is assigned a realistic time slot — no overloaded or rushed days.' },
              { num:'05', title:'Logical Sequencing',      desc:'Morning, afternoon, and evening slots are sequenced for natural flow across the day.' },
            ].map(s => (
              <div className="algo-step" key={s.num}>
                <div className="algo-step__num">{s.num}</div>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Under the hood</p>
          <h2 className="about-section-title">Technology Stack</h2>
          <div className="tech-grid">
            {TECH.map(t => (
              <div className="tech-card" key={t.name}>
                <span className="tech-card__icon">{t.icon}</span>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            ))}
          </div>

          {/* Architecture diagram */}
          <div className="arch-diagram">
            <div className="arch-box arch-box--react">
              <div className="arch-box__icon">⚛️</div>
              <strong>React Frontend</strong>
              <span>Vite · React Router · Axios</span>
            </div>
            <div className="arch-arrow">
              <span>REST API</span>
              <div className="arch-arrow__line">
                <span className="arch-arrow__label">HTTP / JSON</span>
              </div>
            </div>
            <div className="arch-box arch-box--spring">
              <div className="arch-box__icon">🌱</div>
              <strong>Spring Boot API</strong>
              <span>Controllers · Services · JPA</span>
            </div>
            <div className="arch-arrow arch-arrow--db">
              <div className="arch-arrow__line">
                <span className="arch-arrow__label">JDBC</span>
              </div>
            </div>
            <div className="arch-box arch-box--mysql">
              <div className="arch-box__icon">🗄️</div>
              <strong>MySQL Database</strong>
              <span>Destinations · Attractions · Itineraries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section section--alt">
        <div className="container">
          <p className="eyebrow">What's next</p>
          <h2 className="about-section-title">Roadmap</h2>
          <div className="roadmap">
            {ROADMAP.map(r => (
              <div className={`roadmap-item ${r.done ? 'done' : ''}`} key={r.title}>
                <div className="roadmap-item__dot">{r.done ? '✓' : ''}</div>
                <div className="roadmap-item__content">
                  <strong>{r.title}</strong>
                  <p>{r.desc}</p>
                </div>
                {r.done && <span className="roadmap-badge">Live</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to try TripNest?</h2>
          <p>Build your first India itinerary now — completely free.</p>
          <Link to="/plan" className="btn btn-white btn-lg">Plan My Trip →</Link>
        </div>
      </section>
    </main>
  )
}
