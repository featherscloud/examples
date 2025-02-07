import { authFetch } from './auth.js'
import './style.css'

async function loadMessage() {
  // Get data with authentication from your server
  const response = await authFetch('http://localhost:3030/message', {
    method: 'GET',
  })

  if (response.status >= 400) {
    throw new Error(`Failed to load message: ${response.statusText}`)
  }

  const data = await response.json()

  document.getElementById('message')!.innerHTML = data.message
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="wrapper">
      <h1>Feathers Auth + TypeScript demo</h1>
      <p>Message from the server is:</p>
      <h2 id="message"></h2>
    </div>
  </div>
`

loadMessage().catch((error: any) => alert(`There was an error: ${error.message}`))
