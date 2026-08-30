import { NavLink, Route, Routes } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/scorecard', label: 'Scorecard' },
  { to: '/stats', label: 'Stats' },
  { to: '/more', label: 'More' },
]

function PlaceholderPage({ title, message }: { title: string; message: string }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-golf-700">Phase 0</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">{message}</p>
    </section>
  )
}

export function AppShell() {
  return (
    <div className="min-h-dvh bg-golf-50 pb-24 text-slate-950">
      <header className="bg-golf-900 px-5 pb-7 pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-golf-100">Golf trip scoring</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight">Seshlehem Open</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-golf-100">
            Mobile-first competition scoring foundation. Trip data and scoring arrive in later phases.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-3 max-w-3xl px-4 py-6">
        <Routes>
          <Route index element={<PlaceholderPage title="Home" message="Trip dashboard, current round and quick scoring actions will live here." />} />
          <Route path="leaderboard" element={<PlaceholderPage title="Leaderboard" message="Round and overall Stableford standings will live here." />} />
          <Route path="scorecard" element={<PlaceholderPage title="Scorecard" message="Phone-friendly hole-by-hole scorecards will live here." />} />
          <Route path="stats" element={<PlaceholderPage title="Stats" message="Birdies and gross 2s will live here." />} />
          <Route path="more" element={<PlaceholderPage title="More" message="Groups, player switching and lightweight admin tools will live here." />} />
        </Routes>
      </main>

      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto grid max-w-3xl grid-cols-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-h-16 items-center justify-center px-1 text-center text-[11px] font-bold sm:text-xs ${
                  isActive ? 'text-golf-800' : 'text-slate-500'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export function App() {
  return <AppShell />
}
