import { createVerifier } from 'npm:@featherscloud/auth@^0.6.2'

const appId = '<your-app-id>'
const verifier = createVerifier({ appId })
const port = 3030

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*',
}

async function handler(request: Request): Promise<Response> {
  // Handle CORS preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers,
    })
  }

  try {
    const header = request.headers.get('Authorization')
    // Verify the Authorization header and get the user information
    const { user } = await verifier.verifyHeader(header)
    const body = {
      message: `Hello ${user.email} from Deno!`,
    }

    return Response.json(body, {
      status: 200,
      headers,
    })
  }
  catch (error) {
    return Response.json({ error: error.message }, {
      status: 400,
      headers,
    })
  }
}

console.log(`Deno application ${appId} listening on http://localhost:3030`)
Deno.serve({ port }, handler)
