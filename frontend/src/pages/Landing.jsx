import { Link } from 'react-router-dom'

const NAV_CARDS = [
  {
    to: '/home',
    title: 'Team Intelligence',
    desc: 'Pressure resilience, possession quality, and tournament profiles in one executive view.',
  },
  {
    to: '/matches',
    title: 'Match Lab',
    desc: 'Inspect match-level VAEP signals and compare who created more value under tournament stress.',
  },
  {
    to: '/live',
    title: '2026 Monitor',
    desc: 'Track the live tournament workspace with the same premium intelligence layer.',
  },
]

const METRICS = [
  { value: '95%', label: 'Decisive-match signal accuracy' },
  { value: '64', label: 'Historical team profiles' },
  { value: 'AI', label: 'Rule-based analyst reports' },
]

function DataGrid() {
  return (
    <div className="landing-visual" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => (
        <span key={index} style={{ animationDelay: `${index * 70}ms` }} />
      ))}
    </div>
  )
}

export default function Landing() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="hero-gradient" />
        <div className="landing-content fade-in">
          <div className="brand-chip">AI-Powered Tournament Intelligence</div>
          <h1>PressureLab AI</h1>
          <p>
            A premium sports intelligence platform for decoding which teams survive pressure,
            control tournament value, and turn possession into decisive outcomes.
          </p>
          <div className="landing-actions">
            <Link to="/home" className="primary-action">
              Launch Intelligence
            </Link>
            <Link to="/matches" className="secondary-action">
              Open Match Lab
            </Link>
          </div>
        </div>
        <DataGrid />
      </section>

      <section className="landing-metrics">
        {METRICS.map((metric) => (
          <div key={metric.label} className="metric-card glass-panel">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="landing-explain">
        <div className="glass-panel info-panel">
          <div className="eyebrow">Model Signal</div>
          <h2>Possession value, pressure response, and stage survival in one lab.</h2>
          <p>
            PressureLab AI keeps the existing analytics intact and reframes them as decision-ready
            tournament intelligence: PRS, adjusted PRS, VAEP, pressure curves, and match timelines.
          </p>
        </div>
        <div className="glass-panel info-panel">
          <div className="eyebrow">Analyst Layer</div>
          <h2>Built for fast scouting reads and executive summaries.</h2>
          <p>
            Team reports translate the underlying metrics into professional analysis without
            retraining models, changing APIs, or requiring paid AI services.
          </p>
        </div>
      </section>

      <section className="landing-nav-cards">
        {NAV_CARDS.map((card) => (
          <Link key={card.to} to={card.to} className="product-card glass-panel">
            <span>{card.title}</span>
            <p>{card.desc}</p>
            <strong>Explore</strong>
          </Link>
        ))}
      </section>
    </div>
  )
}
