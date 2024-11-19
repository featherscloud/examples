<script lang="ts">
  import svelteLogo from './assets/svelte.svg';
  import { authFetch } from './auth';
  import viteLogo from '/vite.svg';

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
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Feathers Cloud Svelte Demo</h1>
  <p>The message from the server is:</p>
  <h2>{message}</h2>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
