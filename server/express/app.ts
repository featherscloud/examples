import cors from 'cors'
import express from 'express'
import { authenticate } from './authenticate.js'

const app = express()

app.use(cors())
app.get('/', authenticate, async (req, res) => {
  try {
    const response = {
      message: `Hello ${req.user!.email} from Express!`,
    }

    res.status(200).json(response)
  }
  catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

app.listen(3030, '127.0.0.1', () => {
  console.log(
    `Express application listening on http://localhost:3030`,
  )
})
