<script setup lang="ts">
import { createClient, LoginRequiredError } from '@featherscloud/auth'
import { ref } from 'vue'
import { authFetch } from './auth'

const message = ref<string>('')

async function loadMessage() {
  // Get data with authentication from your server
  const response = await authFetch('http://localhost:3030/message', {
    method: 'GET'
  })

  if (response.status >= 400) {
    throw new Error(`Failed to load message: ${response.statusText}`)
  }

  const data = await response.json()
  message.value = data.message
}

loadMessage().catch((error: any) => alert(`There was an error: ${error.message}`))
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
