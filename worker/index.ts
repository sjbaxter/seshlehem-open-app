export interface Env {
  ASSETS: Fetcher
}

const jsonHeaders = { 'content-type': 'application/json; charset=utf-8' }

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/health') {
      if (request.method !== 'GET') {
        return Response.json({ error: 'Method not allowed' }, { status: 405, headers: jsonHeaders })
      }

      return Response.json({ status: 'ok' }, { headers: jsonHeaders })
    }

    if (url.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Not found' }, { status: 404, headers: jsonHeaders })
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
