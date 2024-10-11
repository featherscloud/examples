import { createVerifier } from '@featherscloud/auth'
import cors from 'cors'
import express from 'express'

const appId = '<your-app-id>'
const verifier = createVerifier({ appId })

const app = express()

app.use(cors())
app.get('/', async (req, res) => {
  try {
    const header = req.get('Authorization')
    // Verify the Authorization header and get the user information
    const { user } = await verifier.verifyHeader(header)
    const response = {
      message: `Hello ${user.email} from Express!`,
    }

    res.status(200).json(response)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.listen(3030, '127.0.0.1', () => {
  console.log(
    `Express application ${appId} listening on http://localhost:3030`,
  )
})
