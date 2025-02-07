<script lang="ts">
  import { authFetch } from './auth';

  let message = '';

  async function loadMessage() {
    // Get data with authentication from your server
    const response = await authFetch('http://localhost:3030/message', {
      method: 'GET'
    });

    if (response.status >= 400) {
      throw new Error(`Failed to load message: ${response.statusText}`);
    }

    const body = await response.json();

    message = body.message;
  }

  loadMessage().catch((error: any) =>
    alert(`There was an error: ${error.message}`)
  );
</script>

<main>
  <h1>Feathers Auth Svelte Demo</h1>
  <p>The message from the server is:</p>
  <h2>{message}</h2>
</main>
