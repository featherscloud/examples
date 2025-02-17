import { authenticateRequest } from './authenticate'

// Headers for handling CORS
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*',
}

export default {
  async fetch(request, _env, _ctx): Promise<Response> {
    // Get the path from the request object
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Handle CORS preflight request
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 200,
          headers,
        })
      } else if (path === '/message') {
        const { user } = await authenticateRequest(request)

        if (!user) {
          throw new Error('Cloud auth user not found')
        }
  
        const body = {
          message: `Hello ${user.email} from Cloudflare Worker!`,
        }
  
        return Response.json(body, {
          status: 200,
          headers,
        })
      } else {
        throw new Error(`Not found ${path}`)
      }
    }
    catch (error) {
      return Response.json({ error: (error as any).message }, {
        status: 400,
        headers,
      })
    }
  },
} satisfies ExportedHandler<Env>
