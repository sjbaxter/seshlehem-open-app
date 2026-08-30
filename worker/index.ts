interface AssetsBinding {
  fetch(request: Request): Promise<Response>
}

export interface Env {
  ASSETS: AssetsBinding
}

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)

  if (url.pathname === '/api/health') {
    return Response.json({ status: 'ok', service: 'seshlehem-open-app' })
  }

  if (url.pathname.startsWith('/api/')) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return env.ASSETS.fetch(request)
}

export default {
  fetch: handleRequest,
}
