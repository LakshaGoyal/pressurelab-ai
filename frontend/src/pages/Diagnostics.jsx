import { useEffect, useState } from 'react'
import { BASE_URL } from '../lib/api'

export default function Diagnostics() {
  const [health, setHealth] = useState({ status: 'checking' })
  const [teams, setTeams] = useState({ status: 'checking' })

  useEffect(() => {
    const healthUrl = `${BASE_URL}/health`
    const teamsUrl = `${BASE_URL}/api/teams`

    console.log('[diagnostics] BASE_URL', BASE_URL)
    console.log('[diagnostics] health URL', healthUrl)
    console.log('[diagnostics] teams URL', teamsUrl)

    fetch(healthUrl)
      .then((response) => {
        console.log('[diagnostics] health status', response.status)
        return response.json().then((body) => ({ ok: response.ok, status: response.status, body }))
      })
      .then(setHealth)
      .catch((error) => {
        console.error('[diagnostics] health error', error)
        setHealth({ ok: false, error: String(error) })
      })

    fetch(teamsUrl)
      .then((response) => {
        console.log('[diagnostics] teams status', response.status)
        return response.json().then((body) => ({
          ok: response.ok,
          status: response.status,
          count: Array.isArray(body) ? body.length : null,
          firstTeam: Array.isArray(body) && body.length ? body[0].team_id : null,
        }))
      })
      .then(setTeams)
      .catch((error) => {
        console.error('[diagnostics] teams error', error)
        setTeams({ ok: false, error: String(error) })
      })
  }, [])

  return (
    <div className="dashboard-page" style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="eyebrow">Deployment Diagnostics</div>
      <h1>PressureLab AI API Check</h1>
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Current BASE_URL</h3>
        <pre className="mono" style={{ whiteSpace: 'pre-wrap' }}>{BASE_URL}</pre>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Health Check</h3>
        <pre className="mono" style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(health, null, 2)}</pre>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Teams Fetch</h3>
        <pre className="mono" style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(teams, null, 2)}</pre>
      </div>
    </div>
  )
}
