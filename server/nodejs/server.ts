import { createServer } from 'node:http'
import { createVerifier } from '@featherscloud/auth'

const appId = '<your-app-id>'
const verifier = createVerifier({ appId })

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*',
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, defaultHeaders)
    return res.end()
  }

  try {
    const header = req.headers.authorization
    // Verify the Authorization header and get the user information
    const { user } = await verifier.verifyHeader(header!)
    const response = {
      message: `Hello ${user!.email} from node:http!`,
    }

    res.writeHead(200, defaultHeaders)
    res.end(JSON.stringify(response))
  }
  catch (error: any) {
    res.writeHead(400, defaultHeaders)
    res.end(JSON.stringify({ error: error.message }))
  }
})

// Listen locally on port 3333
server.listen(3030, '127.0.0.1', () => {
  console.log(`NodeJS application ${appId} listening on http://localhost:3030`)
})
