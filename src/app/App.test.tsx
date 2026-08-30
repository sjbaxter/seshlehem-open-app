import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { AppProviders } from './AppProviders'

describe('App', () => {
  it('renders the mobile application shell and primary navigation', () => {
    render(
      <MemoryRouter>
        <AppProviders>
          <App />
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Seshlehem Open' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(5)
  })
})
