import { useEffect, useState } from 'react'

import reactLogo from './assets/react.svg'
import './App.css'
import viteLogo from '/vite.svg'
import { authFetch } from './auth'

async function loadMessage() {
  // Get data with authentication from your server
  const response = await authFetch('http://localhost:3030/message', {
    method: 'GET'
  });

  if (response.status >= 400) {
    throw new Error(`Failed to load message: ${response.statusText}`);
  }

  return response.json();
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
