import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

const navigation = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Leaderboard', path: '/leaderboard', icon: '≡' },
  { label: 'Scorecard', path: '/scorecard', icon: '□' },
  { label: 'Stats', path: '/stats', icon: '↗' },
  { label: 'More', path: '/more', icon: '•••' },
] as const

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="content-card" aria-labelledby="page-title">
      <p className="eyebrow">Application foundation</p>
      <h2 id="page-title">{title}</h2>
      <p>Competition features will be added in the next implementation phases.</p>
    </section>
  )
}

function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-header__kicker">Golf trip scoring</p>
        <h1>Seshlehem Open</h1>
        <p className="app-header__status">Ready for the first tee</p>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<PlaceholderPage title="Welcome" />} />
          <Route path="/leaderboard" element={<PlaceholderPage title="Leaderboard" />} />
          <Route path="/scorecard" element={<PlaceholderPage title="Scorecard" />} />
          <Route path="/stats" element={<PlaceholderPage title="Stats" />} />
          <Route path="/more" element={<PlaceholderPage title="More" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <NavLink
            className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
            key={item.path}
            to={item.path}
          >
            <span className="bottom-nav__icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export function App() {
  return <AppShell />
}
