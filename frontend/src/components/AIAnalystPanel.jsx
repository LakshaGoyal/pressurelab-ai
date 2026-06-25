import { useEffect, useMemo, useRef, useState } from 'react'
import { generateAnalystReport } from '../lib/aiAnalyst'

const MODES = [
  { id: 'team', label: 'Explain This Team' },
  { id: 'match', label: 'Explain This Match' },
  { id: 'elite', label: 'Why Is This Team Elite?' },
  { id: 'fragile', label: 'What Makes This Team Fragile?' },
]

function AnalystSkeleton() {
  return (
    <div className="analyst-skeleton" aria-label="Generating analyst report">
      <span />
      <span />
      <span />
    </div>
  )
}

export default function AIAnalystPanel({ team }) {
  const [mode, setMode] = useState('team')
  const [generating, setGenerating] = useState(false)
  const timerRef = useRef(null)

  const report = useMemo(() => generateAnalystReport(team, mode), [team, mode])

  const chooseMode = (nextMode) => {
    setMode(nextMode)
    setGenerating(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setGenerating(false), 220)
  }

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  return (
    <section className="ai-analyst-panel glass-panel">
      <div className="analyst-header">
        <div>
          <div className="eyebrow">PressureLab AI</div>
          <h2>AI Analyst</h2>
          <p>
            Rule-based tournament intelligence generated from PRS, adjusted PRS, VAEP splits,
            pressure curves, match timeline, and tournament results.
          </p>
        </div>
        <div className="analyst-badge">No API key required</div>
      </div>

      <div className="analyst-actions" role="tablist" aria-label="AI Analyst report type">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={mode === item.id ? 'active' : ''}
            onClick={() => chooseMode(item.id)}
            role="tab"
            aria-selected={mode === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="analyst-report">
        {generating ? (
          <AnalystSkeleton />
        ) : (
          <>
            <div className="report-title">
              <span>{report.title}</span>
              <small>{report.kicker}</small>
            </div>
            {report.sections.map((section) => (
              <article key={section.heading} className="report-section">
                <h3>{section.heading}</h3>
                {section.body && <p>{section.body}</p>}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
