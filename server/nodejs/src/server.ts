import { createServer } from 'node:http'
import { authenticateRequest } from './authenticate.js'

// Basic headers for handling CORS
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*',
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(200, defaultHeaders)
      return res.end()
    } else if (req.url === '/message') {
      const { user } = await authenticateRequest(req)
      const response = {
        message: `Hello ${user!.email} from node:http!`,
      }

      res.writeHead(200, defaultHeaders)
      res.end(JSON.stringify(response))
    } else {
      throw new Error(`Not found ${req.url}`)
    }
  }
  catch (error: any) {
    res.writeHead(400, defaultHeaders)
    res.end(JSON.stringify({ error: error.message }))
  }
})

// Listen locally on port 3333
server.listen(3030, '127.0.0.1', () => {
  console.log(`NodeJS application listening on http://localhost:3030`)
})
