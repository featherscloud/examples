<script lang="ts">
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';

  import { createClient, LoginRequiredError } from '@featherscloud/auth';

  const appId = '<your-app-id>';
  const auth = createClient({ appId });

  let message = '';

  async function loadMessage() {
    try {
      // Get data with authentication from your server
      const response = await fetch('http://localhost:3030', {
        headers: {
          Authorization: await auth.getHeader()
        }
      });
      const body = await response.json();

      message = body.message;
    } catch (error) {
      // Redirect to the login page when login is required
      if (error instanceof LoginRequiredError) {
        window.location.href = await auth.getLoginUrl(error);
      } else {
        throw error;
      }
    }
  }

  loadMessage();
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
