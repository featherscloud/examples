<script lang="ts">
  import { createClient, LoginRequiredError } from '@featherscloud/auth';

  // Initialize the Feathers Cloud Auth client for your application
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

      // Set the message from the server response
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
  <h1>Feathers Cloud Svelte Demo</h1>
  <p>The message from the server is:</p>
  <h2>{message}</h2>
</main>
