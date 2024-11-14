import { CloudAuthUser, createVerifier } from '@featherscloud/auth'
import type { Request, Response, NextFunction } from 'express'

const appId = '<your-app-id>'
const verifier = createVerifier({ appId })

declare global {
  namespace Express {
    interface Request {
      user?: CloudAuthUser | null
    }
  }
}

export async function authenticateRequest(req: Request) {
  const header = req.headers['authorization']
  
  return verifier.verifyHeader(header!)
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const { user } = await authenticateRequest(req)
    req.user = user
    next()
  } catch (error: unknown) {
    next(error)
  }
}
