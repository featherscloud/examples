import { IncomingMessage } from 'node:http'
import { createVerifier } from '@featherscloud/auth'

const appId = '<your-app-id>'
const verifier = createVerifier({ appId })

/**
 * Authenticates a request using Feathers Cloud Auth.
 * Will throw an error if verification failed.
 * 
 * @param req The Express or NodeJS request object
 * @returns The authenticated request information like `user` and `token`
 */
export async function authenticateRequest(req: IncomingMessage) {
  const header = req.headers['authorization']
  
  return verifier.verifyHeader(header!)
}
