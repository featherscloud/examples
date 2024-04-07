import React, { useEffect, useState } from 'react';
import { LoginRequiredError, createClient } from '@featherscloud/auth'

import logo from './logo.svg';
import './App.css';

const auth = createClient({
  appId: '<app-did>',
  tokenUrl: 'http://localhost:8787/token'
})

async function loadMessage () {
  try {
    const authorization = await auth.getBearerToken()
    // Get data with authentication from your server
    const response = await fetch('http://localhost:3030', {
      headers: { authorization }
    })
    return response.json()
  } catch (error) {
    // Redirect to the login page when login is required
    if (error instanceof LoginRequiredError) {
      window.location.href = error.loginUrl
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <h1>Feathers Cloud Auth demo</h1>
          <h2>
            Message from the server is: <strong>{message}</strong>
          </h2>
        </p>
      </header>
    </div>
  );
}

export default App;
