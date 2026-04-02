import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchDestinations } from '../api/tripnest'
import './Destinations.css'

const REGIONS = ['All', 'North', 'South', 'East', 'West', 'Central']

/* Static fallback data in case backend is offline */
const FALLBACK = [
  { id:1,  name:'Agra',         region:'North',   state:'Uttar Pradesh',   description:'Home of the iconic Taj Mahal and grand Mughal-era monuments.',        tags:['Heritage','UNESCO','Mughal'],      emoji:'🕌' },
  { id:2,  name:'Jaipur',       region:'North',   state:'Rajasthan',        description:'The Pink City — palaces, forts, vibrant bazaars and royal history.',   tags:['Royalty','Culture','Forts'],       emoji:'🏯' },
  { id:3,  name:'Delhi',        region:'North',   state:'Delhi',            description:'India\'s capital blends ancient monuments with a buzzing modern city.', tags:['Metro','History','Food'],          emoji:'🕍' },
  { id:4,  name:'Varanasi',     region:'North',   state:'Uttar Pradesh',   description:'The spiritual heart of India, on the banks of the sacred Ganga.',       tags:['Spiritual','Ghats','Pilgrimage'],  emoji:'🪔' },
  { id:5,  name:'Shimla',       region:'North',   state:'Himachal Pradesh', description:'Colonial hill station with stunning Himalayan views and cool air.',     tags:['Hills','Heritage','Nature'],       emoji:'🏔️' },
  { id:6,  name:'Manali',       region:'North',   state:'Himachal Pradesh', description:'Adventure hub for trekking, river rafting, and snowy peaks.',           tags:['Adventure','Snow','Nature'],       emoji:'❄️' },
  { id:7,  name:'Amritsar',     region:'North',   state:'Punjab',           description:'Golden Temple city — a spiritual and cultural landmark of Punjab.',     tags:['Spiritual','Culture','Sikh'],      emoji:'🛕' },
  { id:8,  name:'Rishikesh',    region:'North',   state:'Uttarakhand',      description:'Yoga capital of the world with white-water rafting on the Ganga.',      tags:['Yoga','Adventure','Spiritual'],    emoji:'🌊' },
  { id:9,  name:'Goa',          region:'South',   state:'Goa',              description:'Sun-kissed beaches, historic forts, and vibrant nightlife.',             tags:['Beach','Forts','Nightlife'],       emoji:'🏖️' },
  { id:10, name:'Munnar',       region:'South',   state:'Kerala',           description:'Rolling tea gardens and misty peaks in the Western Ghats.',             tags:['Nature','Tea','Hills'],            emoji:'🌿' },
  { id:11, name:'Ooty',         region:'South',   state:'Tamil Nadu',       description:'The Queen of Hill Stations — lakes, botanical gardens, and cool air.',  tags:['Hills','Nature','Gardens'],        emoji:'🌸' },
  { id:12, name:'Mysore',       region:'South',   state:'Karnataka',        description:'City of palaces, sandalwood, and the grand Dasara festival.',            tags:['Royalty','Culture','Palaces'],     emoji:'👑' },
  { id:13, name:'Hampi',        region:'South',   state:'Karnataka',        description:'UNESCO World Heritage ruined city of the Vijayanagara Empire.',          tags:['Heritage','UNESCO','Ruins'],       emoji:'🏛️' },
  { id:14, name:'Pondicherry',  region:'South',   state:'Puducherry',       description:'French colonial charm meets Tamil culture on the Coromandel Coast.',    tags:['Colonial','Beach','Culture'],      emoji:'🥐' },
  { id:15, name:'Alleppey',     region:'South',   state:'Kerala',           description:'Backwater houseboats, rice paddies, and serene canals.',                tags:['Backwaters','Nature','Houseboat'], emoji:'🚤' },
  { id:16, name:'Coorg',        region:'South',   state:'Karnataka',        description:'Coffee hills, waterfalls, and misty forests of South India.',           tags:['Nature','Coffee','Hills'],         emoji:'☕' },
  { id:17, name:'Darjeeling',   region:'East',    state:'West Bengal',      description:'Tea gardens at sunrise, Kanchenjunga views, and the toy train.',        tags:['Tea','Hills','Scenic'],            emoji:'🍵' },
  { id:18, name:'Kolkata',      region:'East',    state:'West Bengal',      description:'The City of Joy — art, literature, food, and colonial grandeur.',       tags:['Culture','Art','Food'],            emoji:'🎭' },
  { id:19, name:'Puri',         region:'East',    state:'Odisha',           description:'Sacred Jagannath Temple and the golden shores of the Bay of Bengal.',   tags:['Spiritual','Beach','Temple'],      emoji:'🌅' },
  { id:20, name:'Gangtok',      region:'East',    state:'Sikkim',           description:'Mountain town with Buddhist monasteries and panoramic Himalayan views.', tags:['Hills','Buddhist','Scenic'],      emoji:'🏔️' },
  { id:21, name:'Mumbai',       region:'West',    state:'Maharashtra',      description:'India\'s maximum city — Bollywood, colonial heritage, and street food.',tags:['Metro','Bollywood','Food'],        emoji:'🌆' },
  { id:22, name:'Udaipur',      region:'West',    state:'Rajasthan',        description:'The City of Lakes — romantic palaces, vibrant culture, and sunset views.',tags:['Royalty','Lakes','Romance'],     emoji:'🏰' },
  { id:23, name:'Pushkar',      region:'West',    state:'Rajasthan',        description:'Holy lake town famous for its Brahma temple and camel fair.',            tags:['Spiritual','Desert','Culture'],   emoji:'🐪' },
  { id:24, name:'Ajanta-Ellora',region:'West',    state:'Maharashtra',      description:'UNESCO rock-cut caves with stunning Buddhist, Hindu, and Jain art.',    tags:['Heritage','UNESCO','Caves'],       emoji:'🪨' },
  { id:25, name:'Khajuraho',    region:'Central', state:'Madhya Pradesh',   description:'UNESCO temples famous for intricate medieval sculptures and carvings.',  tags:['Heritage','UNESCO','Temples'],    emoji:'🛕' },
  { id:26, name:'Pachmarhi',    region:'Central', state:'Madhya Pradesh',   description:'Only hill station of MP, with waterfalls, caves, and dense forests.',   tags:['Nature','Hills','Adventure'],     emoji:'🌲' },
]

export default function Destinations() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [destinations, setDestinations] = useState(FALLBACK)
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    fetchDestinations()
      .then(data => { if (data?.length) setDestinations(data) })
      .catch(() => {/* use fallback silently */})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeRegion === 'All'
    ? destinations
    : destinations.filter(d => d.region === activeRegion)

  return (
    <main>
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">Across the subcontinent</p>
          <h1>Explore Destinations</h1>
          <p>From snow-capped peaks to sun-lit beaches — pick your next adventure.</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="container">
        <div className="filter-tabs">
          {REGIONS.map(r => (
            <button
              key={r}
              className={`filter-tab ${activeRegion === r ? 'active' : ''}`}
              onClick={() => setActiveRegion(r)}
            >
              {r === 'All' ? 'All India' : `${r} India`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:'60px 0' }}>
              <div className="spinner" />
            </div>
          ) : (
            <div className="dest-grid">
              {filtered.map((d, i) => (
                <div
                  className="dest-item fade-up"
                  key={d.id || d.name}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="dest-item__emoji">{d.emoji}</div>
                  <div className="dest-item__body">
                    <div className="dest-item__meta">
                      <span className="dest-item__region">{d.region} India</span>
                      <span className="dest-item__state">{d.state}</span>
                    </div>
                    <h3 className="dest-item__name">{d.name}</h3>
                    <p className="dest-item__desc">{d.description}</p>
                    <div className="dest-item__tags">
                      {(d.tags || []).map(t => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/plan?dest=${d.name}`} className="btn btn-ghost btn-sm dest-item__cta">
                    Plan Trip →
                  </Link>
                </div>
              ))}
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <p style={{ textAlign:'center', color:'var(--muted)', padding:'60px 0' }}>
              No destinations found for this region.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2>Found your destination?</h2>
          <p>Pick your dates and let TripNest handle the rest.</p>
          <Link to="/plan" className="btn btn-white btn-lg">Start Planning →</Link>
        </div>
      </section>
    </main>
  )
}
