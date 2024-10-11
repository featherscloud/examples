<script setup lang="ts">
import { createClient, LoginRequiredError } from '@featherscloud/auth'

import { ref } from 'vue'

const appId = '<your-app-id>'
const auth = createClient({ appId })

const message = ref<string>('')

async function loadMessage() {
  try {
    // Get data with authentication from your server
    const response = await fetch('http://localhost:3030', {
      headers: {
        // Get the authorization header for each request
        Authorization: await auth.getHeader(),
      },
    })
    const data = await response.json()
    message.value = data.message
  }
  catch (error) {
    // Redirect to the login page when login is required
    if (error instanceof LoginRequiredError) {
      window.location.href = await auth.getLoginUrl(error)
    }
    else {
      throw error
    }
  }
}

loadMessage()
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125">

    <div class="wrapper">
      <h1>Feathers Cloud Auth VueJS demo</h1>
      <p>Message from the server is:</p>
      <h2><strong>{{ message }}</strong></h2>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
