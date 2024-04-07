<script setup lang="ts">
import { createClient, LoginRequiredError } from '@featherscloud/auth'

import TheWelcome from './components/TheWelcome.vue'
import { ref } from 'vue';

const auth = createClient({
  appId: '<app-did>',
  tokenUrl: 'http://localhost:8787/token'
})

const message = ref<string>('')

async function loadMessage () {
  try {
    const authorization = await auth.getBearerToken()
    // Get data with authentication from your server
    const response = await fetch('http://localhost:3030', {
      headers: { authorization }
    })
    const data = await response.json()
    message.value = data.message
  } catch (error) {
    // Redirect to the login page when login is required
    if (error instanceof LoginRequiredError) {
      window.location.href = error.loginUrl
    } else {
      throw error
    }
  }
}

loadMessage()
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>Feathers Cloud Auth demo</h1>
      <h2>
        Message from the server is: <strong>{{message}}</strong>
      </h2>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
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
