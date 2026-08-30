import { describe, expect, it } from 'vitest'
import { handleRequest, type Env } from './index'

describe('worker health route', () => {
  it('returns a healthy response', async () => {
    const env: Env = {
      ASSETS: {
        fetch: async () => new Response('asset'),
      },
    }

    const response = await handleRequest(new Request('https://example.test/api/health'), env)

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      status: 'ok',
      service: 'seshlehem-open-app',
    })
  })
})
