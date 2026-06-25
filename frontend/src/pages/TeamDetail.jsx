import { Link, useParams } from 'react-router-dom'
import { useTeam } from '../hooks/useTeam'
import ResilienceCard from '../components/ResilienceCard'
import PressureCurve from '../components/PressureCurve'
import StageDropoff from '../components/StageDropoff'
import TournamentTimeline from '../components/TournamentTimeline'
import Flag from '../components/Flag'
import AIAnalystPanel from '../components/AIAnalystPanel'

function TeamDetailSkeleton() {
  return (
    <div className="team-detail-page">
      <div className="skeleton-line short" />
      <div className="team-hero skeleton-card" />
      <div className="detail-grid">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>
    </div>
  )
}

function StatCard({ label, value, tone = 'var(--accent-teal)' }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong style={{ color: tone }}>{value}</strong>
    </div>
  )
}

export default function TeamDetail() {
  const { teamId } = useParams()
  const { data: team, loading, error } = useTeam(teamId)

  if (loading || !team) {
    return <TeamDetailSkeleton />
  }
  if (error) {
    return <p>Could not load this team.</p>
  }

  const quadrantColor = team.quadrant ? `var(--${team.quadrant})` : 'var(--accent-teal)'

  return (
    <div className="team-detail-page">
      <Link to="/home" className="back-link">
        ← Back
      </Link>

      <div className="team-hero glass-panel">
        <Flag teamName={team.team_name} width={64} />
        <div>
          <div className="eyebrow">Team Intelligence Report</div>
          <h1>{team.team_name}</h1>
          <span>
            {team.tournament} · {team.matches_played} matches
          </span>
        </div>
        <div className="hero-result">
          <span>{team.tournament_result}</span>
          {team.quadrant && <strong style={{ color: quadrantColor }}>{team.quadrant}</strong>}
        </div>
      </div>

      <div className="stat-strip">
        <StatCard label="PRS" value={team.prs != null ? team.prs.toFixed(1) : '--'} tone={quadrantColor} />
        <StatCard label="Adjusted PRS" value={team.adj_prs != null ? team.adj_prs.toFixed(1) : '--'} />
        <StatCard label="PPI" value={team.ppi != null ? team.ppi.toFixed(4) : '--'} tone="var(--accent-blue)" />
        <StatCard
          label="Stage Retention"
          value={team.stage_retention != null ? `${team.stage_retention.toFixed(2)}x` : '--'}
          tone="var(--accent-amber)"
        />
      </div>

      {(team.surprising_result_note || team.low_sample_warning) && (
        <div
          className="glass-panel"
          style={{
            background: 'var(--neutral-dim)',
            border: '1px solid var(--neutral)',
            borderRadius: 10,
            padding: 16,
            marginBottom: 24,
          }}
        >
          {team.surprising_result_note ? (
            <p style={{ margin: 0 }}>⚠ {team.surprising_result_note}</p>
          ) : (
            <p style={{ margin: 0 }}>
              ⚠ This PRS is based on a small losing-state sample ({team.losing_sample_size}{' '}
              actions across {team.matches_played} matches) — {team.team_name} rarely trailed, so
              this score is noisier than for teams who spent more time behind.
            </p>
          )}
        </div>
      )}

      <div
        className="detail-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}
      >
        <div className="glass-panel detail-card">
          <ResilienceCard
            prs={team.prs}
            adjPrs={team.adj_prs}
            prsRank={team.combined_prs_rank}
            totalTeams={64}
            quadrant={team.quadrant}
          />
        </div>
        <div className="glass-panel detail-card">
          <h3>Pressure Profile</h3>
          <PressureCurve curve={team.pressure_curve} />
        </div>
        <div className="glass-panel detail-card">
          <h3>Stage Retention</h3>
          <StageDropoff groupVaep={team.group_vaep_avg} knockoutVaep={team.knockout_vaep_avg} />
        </div>
      </div>

      <AIAnalystPanel team={team} />

      <h3 style={{ marginTop: 32 }}>Tournament Timeline</h3>
      <TournamentTimeline timeline={team.match_timeline} teamName={team.team_name} />

      {team.pressure_insight && (
        <div
          className="card"
          style={{
            marginTop: 32,
            borderLeft: '3px solid var(--accent-teal)',
            background: 'var(--bg-secondary)',
            padding: '20px 24px',
            fontSize: 17,
            lineHeight: 1.6,
          }}
        >
          {team.pressure_insight}
        </div>
      )}
    </div>
  )
}
