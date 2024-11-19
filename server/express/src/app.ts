import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import { authenticate } from './authenticate.js'

const app = express()

app.use(cors())
// On the /message route, require authentication and return a message for the authenticated user
app.get('/message', authenticate, (req, res) => {
  const response = {
    message: `Hello ${req.user!.email} from Express!`,
  }

  res.status(200).json(response)
})

// Handle any errors
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: error?.message || 'Unknown error' })
})

app.listen(3030, '127.0.0.1', () => {
  console.log(
    `Express application listening on http://localhost:3030`,
  )
})
