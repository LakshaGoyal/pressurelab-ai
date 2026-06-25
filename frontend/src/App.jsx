import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import TeamDetail from './pages/TeamDetail'
import Live2026 from './pages/Live2026'
import Methodology from './pages/Methodology'
import MatchBrowser from './pages/MatchBrowser'

const navLinkStyle = ({ isActive }) => ({
  padding: '10px 12px',
  marginRight: 6,
  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
  border: isActive ? '1px solid var(--accent-border)' : '1px solid transparent',
  background: isActive ? 'var(--accent-dim)' : 'transparent',
  borderRadius: 999,
  textDecoration: 'none',
  fontFamily: 'var(--font-display)',
  fontSize: 15,
  transition: 'color 160ms ease, border-color 160ms ease, background 160ms ease, transform 160ms ease',
})

function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${pct}%` }} />
}

function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/landing' || location.pathname === '/'

  return (
    <div>
      {!isLanding && (
        <>
          <ScrollProgress />
          <nav
            className="app-nav"
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              background: 'rgba(5, 10, 24, 0.72)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backdropFilter: 'blur(18px)',
            }}
          >
            <NavLink
              to="/home"
              style={{ ...navLinkStyle({ isActive: false }), fontWeight: 700, marginRight: 28 }}
            >
              PressureLab <span style={{ color: 'var(--accent-cyan)' }}>AI</span>
            </NavLink>
            <NavLink to="/home" style={navLinkStyle} end>
              Analysis
            </NavLink>
            <NavLink to="/matches" style={navLinkStyle}>
              Matches
            </NavLink>
            <NavLink to="/live" style={navLinkStyle}>
              2026 Live
            </NavLink>
            <NavLink to="/methodology" style={navLinkStyle}>
              Methodology
            </NavLink>
          </nav>
        </>
      )}
      <main style={isLanding ? {} : { padding: 24 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/team/:teamId" element={<TeamDetail />} />
          <Route path="/matches" element={<MatchBrowser />} />
          <Route path="/live" element={<Live2026 />} />
          <Route path="/methodology" element={<Methodology />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
