import { useEffect, useState } from 'react'
import { createClient, LoginRequiredError } from '@featherscloud/auth'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const appId = '<your-app-id>'
const auth = createClient({ appId })

async function loadMessage () {
  try {
    // Get data with authentication from your server
    const response = await fetch('http://localhost:3030', {
      headers: {
        Authorization: await auth.getHeader()
      }
    })
    return response.json()
  } catch (error) {
    // Redirect to the login page when login is required
    if (error instanceof LoginRequiredError) {
      window.location.href = await auth.getLoginUrl(error)
    } else {
      throw error
    }
  }
}

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadMessage().then(({ message }) => setMessage(message))
  }, [message])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Feathers Cloud Auth React Demo</h1>
      <div className="card">
        <p>The message from the server is:</p>
      </div>
      <h2>{message}</h2>
    </>
  )
}

export default App
