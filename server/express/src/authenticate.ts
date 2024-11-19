import { CloudAuthUser, createVerifier } from '@featherscloud/auth'
import type { Request, Response, NextFunction } from 'express'

const appId = '<your-app-id>'
const verifier = createVerifier({ appId })

// Augment the Express request object to include the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: CloudAuthUser | null
    }
  }
}

/**
 * Authenticates a request using Feathers Cloud Auth.
 * Will throw an error if verification failed.
 * 
 * @param req The Express or NodeJS request object
 * @returns The authenticated request information like `user` and `token`
 */
export async function authenticateRequest(req: Request) {
  const header = req.headers['authorization']
  
  return verifier.verifyHeader(header!)
}

/**
 * An Express middleware that authenticates a request using Feathers Cloud Auth.
 * If successful, the authenticated user is added as `req.user`.
 * 
 * @param req The Express request object
 * @param _res The Express response object
 * @param next Next handler
 */
export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const { user } = await authenticateRequest(req)

    // Add the authenticated user information to the request object
    req.user = user

    next()
  } catch (error: unknown) {
    // Pass the error to the Express error handler
    next(error)
  }
}
