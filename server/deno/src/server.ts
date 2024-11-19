import { authenticateRequest } from "./authenticate.ts"

const port = 3030

// Headers for handling CORS
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*',
}

async function handler(request: Request): Promise<Response> {
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
    }
    else if (path === '/message') {
      const { user } = await authenticateRequest(request)
      const body = {
        message: `Hello ${user.email} from Deno!`,
      }
  
      return Response.json(body, {
        status: 200,
        headers,
      })
    } else {
      throw new Error(`Not Found ${path}`)
    }
  }
  catch (error) {
    return Response.json({ error: error.message }, {
      status: 400,
      headers,
    })
  }
}

console.log(`Deno application listening on http://localhost:3030`)

Deno.serve({ port }, handler)
