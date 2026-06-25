export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

console.log('[api] BASE_URL', BASE_URL)

async function request(path) {
  const url = `${BASE_URL}${path}`
  console.log('[api] fetch URL', url)
  try {
    const response = await fetch(url)
    console.log('[api] response status', path, response.status)
    if (!response.ok) {
      throw new Error(`Request to ${path} failed with status ${response.status}`)
    }
    return response.json()
  } catch (err) {
    console.error('[api] fetch error', path, err)
    throw err
  }
}

export function fetchTeams() {
  return request('/api/teams')
}

export function fetchTeam(teamId) {
  return request(`/api/team/${teamId}`)
}

export function fetchMatches() {
  return request('/api/matches')
}

export function fetchRegression() {
  return request('/api/regression')
}

export function fetchMethodology() {
  return request('/api/methodology')
}

export function fetchLiveTeams() {
  return request('/api/live/teams')
}
