import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from './App'

describe('AppShell', () => {
  it('renders the Seshlehem Open mobile navigation', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Seshlehem Open' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Leaderboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Scorecard' })).toBeInTheDocument()
  })
})
