import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { generateItinerary } from '../api/tripnest'
import './Plan.css'

/* ── Constants ── */
const DESTINATIONS_LIST = [
  { group: 'North India',   items: ['Agra','Jaipur','Delhi','Varanasi','Shimla','Manali','Amritsar','Rishikesh'] },
  { group: 'South India',   items: ['Goa','Munnar','Ooty','Mysore','Coorg','Hampi','Pondicherry','Alleppey'] },
  { group: 'East India',    items: ['Darjeeling','Puri','Kolkata','Gangtok'] },
  { group: 'West India',    items: ['Mumbai','Udaipur','Pushkar','Ajanta-Ellora'] },
  { group: 'Central India', items: ['Khajuraho','Pachmarhi'] },
]

const TIME_SLOTS = ['9:00 AM','11:30 AM','2:00 PM','4:30 PM']

const ICON_MAP = {
  fort:'🏯', palace:'🏰', temple:'🛕', beach:'🏖️', garden:'🌿',
  market:'🛍️', museum:'🏛️', lake:'🌊', church:'⛪', mosque:'🕌',
  viewpoint:'👁️', cave:'🪨', waterfall:'💧', park:'🌳',
  ghat:'🪔', mahal:'✨', boat:'🚤', activity:'🎯', heritage:'🏺',
  spiritual:'☮️', adventure:'🏔️', nature:'🌲', monument:'🗼',
}
const getIcon = (type, emoji) => {
  if (emoji) return emoji
  if (!type) return '📍'
  const t = type.toLowerCase()
  for (const [k, v] of Object.entries(ICON_MAP)) if (t.includes(k)) return v
  return '📍'
}

/* ── Fallback sample data when backend is down ── */
const SAMPLE = {
  Jaipur:    [['Amber Fort','Nahargarh Fort','City Palace'],['Hawa Mahal','Jantar Mantar','Johri Bazaar'],['Jal Mahal','Albert Hall Museum','Birla Mandir']],
  Goa:       [['Calangute Beach','Fort Aguada','Sinquerim Beach'],['Old Goa Churches','Dona Paula','Miramar Beach'],['Dudhsagar Falls','Anjuna Flea Market']],
  Varanasi:  [['Dashashwamedh Ghat','Kashi Vishwanath Temple','Ganga Aarti'],['Sarnath','Assi Ghat','Tulsi Manas Temple'],['Manikarnika Ghat','BHU Campus']],
  Agra:      [['Taj Mahal (Sunrise)','Agra Fort'],['Fatehpur Sikri','Itmad-ud-Daulah'],['Mehtab Bagh','Kinari Bazaar']],
  Munnar:    [['Tea Plantations','Mattupetty Dam','Echo Point'],['Eravikulam National Park','Top Station'],['Attukad Waterfalls','Lockhart Gap']],
  Delhi:     [['Red Fort','Chandni Chowk','Jama Masjid'],["Humayun's Tomb",'Lotus Temple','India Gate'],['Qutub Minar','Hauz Khas Village']],
  Mumbai:    [['Gateway of India','Elephanta Caves'],['Marine Drive','Chhatrapati Shivaji Terminus'],['Dharavi','Crawford Market','Bandra Sea Link']],
  Udaipur:   [['City Palace','Lake Pichola Boat Ride'],['Jag Mandir','Saheliyon ki Bari'],['Fateh Sagar Lake','Bagore Ki Haveli']],
  default:   [['City Highlights Tour','Heritage Walk','Local Market'],['Major Attraction','Cultural Site','Sunset Viewpoint'],['Day Excursion','Local Cuisine Experience']],
}

function buildFallback(destination, startDate, days) {
  const sample = SAMPLE[destination] || SAMPLE.default
  return Array.from({ length: days }, (_, i) => ({
    dayNumber: i + 1,
    date: new Date(startDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'short', year:'numeric' }),
    theme: ['Arrival & Highlights','Deep Exploration','Culture & Cuisine','Hidden Gems','Farewell & Leisure'][i] || 'Exploration',
    activities: (sample[i] || sample[i % sample.length] || []).map((name, j) => ({
      name, description: '', type: '', emoji: '', suggestedTime: TIME_SLOTS[j] || '', durationMins: 60,
    })),
  }))
}

/* ── Plan Page Component ── */
export default function Plan() {
  const [params] = useSearchParams()
  const today = new Date().toISOString().split('T')[0]

  const [dest,      setDest]      = useState(params.get('dest') || '')
  const [startDate, setStartDate] = useState('')
  const [endDate,   setEndDate]   = useState('')
  const [errors,    setErrors]    = useState({})
  const [status,    setStatus]    = useState('idle') // idle | loading | result | error
  const [itinerary, setItinerary] = useState(null)
  const [isFallback, setIsFallback] = useState(false)

  /* duration display */
  const days = startDate && endDate
    ? Math.round((new Date(endDate) - new Date(startDate)) / 86400000)
    : null

  /* validation */
  function validate() {
    const e = {}
    if (!dest)               e.dest  = 'Please select a destination.'
    if (!startDate)          e.start = 'Please pick a start date.'
    if (!endDate || endDate <= startDate) {
      e.end = 'Return date must be after start date.'
    } else if (days < 2 || days > 5) {
      e.end = 'TripNest supports 2–5 day trips in the beta.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function fmtDate(d) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setIsFallback(false)

    try {
      const data = await generateItinerary({ destination: dest, startDate, endDate })
      /* normalise response */
      const normDays = (data.days || []).map((d, i) => ({
        dayNumber: d.dayNumber || i + 1,
        date: d.date
          ? new Date(d.date).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'short', year:'numeric' })
          : fmtDate(new Date(startDate + 'T00:00:00').setDate(new Date(startDate).getDate() + i)),
        theme: d.theme || '',
        activities: (d.activities || []).map((a, j) => ({
          name:         a.name || 'Activity',
          description:  a.description || '',
          type:         a.type || '',
          emoji:        a.emoji || '',
          suggestedTime: a.suggestedTime || TIME_SLOTS[j] || '',
          durationMins:  a.durationMins || 60,
        })),
      }))
      setItinerary({ destination: data.destination || dest, startDate, endDate, durationDays: days, days: normDays })
      setStatus('result')
    } catch (err) {
      console.warn('Backend unavailable, using sample data:', err.message)
      const fallbackDays = buildFallback(dest, startDate, days)
      setItinerary({ destination: dest, startDate, endDate, durationDays: days, days: fallbackDays })
      setIsFallback(true)
      setStatus('result')
    }
  }

  return (
    <div className="plan-layout">

      {/* ── FORM PANEL ── */}
      <aside className="form-panel">
        <div className="form-panel__inner">
          <p className="eyebrow">Step 1 of 1</p>
          <h1 className="form-panel__title">Where are you heading?</h1>
          <p className="form-panel__sub">Fill in the details and let TripNest build your itinerary.</p>

          <form onSubmit={handleSubmit} noValidate className="trip-form">

            {/* Destination */}
            <div className="form-group">
              <label className="form-label" htmlFor="destination">Destination</label>
              <div className="select-wrap">
                <select
                  id="destination"
                  className={`form-select ${errors.dest ? 'error' : ''}`}
                  value={dest}
                  onChange={e => setDest(e.target.value)}
                >
                  <option value="" disabled>Select a destination…</option>
                  {DESTINATIONS_LIST.map(g => (
                    <optgroup label={g.group} key={g.group}>
                      {g.items.map(name => <option value={name} key={name}>{name}</option>)}
                    </optgroup>
                  ))}
                </select>
                <span className="select-arrow">▾</span>
              </div>
              <span className="form-error">{errors.dest || ''}</span>
            </div>

            {/* Dates */}
            <div className="dates-row">
              <div className="form-group">
                <label className="form-label" htmlFor="startDate">Start Date</label>
                <input
                  type="date" id="startDate"
                  className={`form-input ${errors.start ? 'error' : ''}`}
                  min={today} value={startDate}
                  onChange={e => {
                    setStartDate(e.target.value)
                    if (endDate && endDate < e.target.value) setEndDate('')
                  }}
                />
                <span className="form-error">{errors.start || ''}</span>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="endDate">Return Date</label>
                <input
                  type="date" id="endDate"
                  className={`form-input ${errors.end ? 'error' : ''}`}
                  min={startDate || today} value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
                <span className="form-error">{errors.end || ''}</span>
              </div>
            </div>

            {/* Duration badge */}
            {days > 0 && (
              <div className="duration-badge">
                <span>🗓️</span>
                <span>{days} day{days !== 1 ? 's' : ''} trip</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={status === 'loading'}>
              {status === 'loading' ? 'Building your itinerary…' : 'Generate My Itinerary →'}
            </button>
          </form>

          <p className="form-note">✦ Currently supporting 2–5 day trips across Indian destinations.</p>
        </div>
      </aside>

      {/* ── RESULT PANEL ── */}
      <section className="result-panel">

        {/* Idle */}
        {status === 'idle' && (
          <div className="result-empty">
            <div className="result-empty__icon">🗺️</div>
            <h3>Your itinerary will appear here</h3>
            <p>Fill in the form and hit <strong>Generate My Itinerary</strong>.</p>
          </div>
        )}

        {/* Loading */}
        {status === 'loading' && (
          <div className="result-loading">
            <div className="spinner" />
            <p>Building your perfect trip…</p>
          </div>
        )}

        {/* Result */}
        {status === 'result' && itinerary && (
          <div className="result-content fade-up">
            {isFallback && (
              <div className="fallback-notice">
                ⚠️ <strong>Preview mode:</strong> Backend not connected. Showing sample itinerary for {itinerary.destination}.
              </div>
            )}
            <div className="result-header">
              <div>
                <h2>Your {itinerary.destination} Itinerary</h2>
                <p className="result-meta">
                  {itinerary.durationDays} days · {fmtDate(itinerary.startDate)} – {fmtDate(itinerary.endDate)}
                </p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => window.print()}>⎙ Print</button>
            </div>

            <div className="itin-days">
              {itinerary.days.map(day => (
                <div className="itin-day" key={day.dayNumber}>
                  <div className="itin-day__header">
                    <div>
                      <span className="itin-day__label">Day {day.dayNumber}</span>
                      {day.theme && <span className="itin-day__theme">{day.theme}</span>}
                    </div>
                    <span className="itin-day__date">{day.date}</span>
                  </div>
                  <ul className="itin-activities">
                    {day.activities.map((act, j) => (
                      <li className="itin-activity" key={j}>
                        <div className="itin-activity__icon">
                          {getIcon(act.type, act.emoji)}
                        </div>
                        <div className="itin-activity__info">
                          <div className="itin-activity__name">{act.name}</div>
                          {act.description && <div className="itin-activity__desc">{act.description}</div>}
                        </div>
                        {act.suggestedTime && (
                          <span className="itin-activity__time">{act.suggestedTime}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="result-footer">
              <Link to="/destinations" className="btn btn-ghost btn-sm">← Change Destination</Link>
              <button className="btn btn-primary btn-sm" onClick={() => setStatus('idle')}>Plan Another Trip</button>
            </div>
          </div>
        )}

      </section>
    </div>
  )
}
