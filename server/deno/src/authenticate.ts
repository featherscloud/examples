import { createVerifier } from 'npm:@featherscloud/auth@^0.6.2'

const appId = '<your-app-id>'
const verifier = createVerifier({ appId })

/**
 * Verify authentication for a web standard request object.
 * Will throw an error if verification was not successful.
 * 
 * @param request The request object
 * @returns The authentication information like `user` and `token`
 */
export async function authenticateRequest(request: Request) {
  const header = request.headers.get('Authorization')

  return verifier.verifyHeader(header!)
}
