import { IncomingMessage } from 'node:http'
import { createVerifier } from '@featherscloud/auth'

/**
 * The public application identifier for your Feathers Cloud app.
 * You can change the login page theme and other settings at
 * https://app.feathers.cloud/app/<your-app-id>
 */
const appId = '<your-app-id>'

/**
 * A verifier for the verifies tokens and authorization headers
 * for an application with the given `appId`.
 */
const verifier = createVerifier({ appId })

/**
 * Authenticates a request using Feathers Cloud Auth.
 * Will throw an error if verification failed.
 * 
 * @param req The Express or NodeJS request object
 * @returns The authenticated request information like `user` and `token`
 */
export async function authenticateRequest(req: IncomingMessage) {
  const header = req.headers.authorization
  
  return verifier.verifyHeader(header!)
}
