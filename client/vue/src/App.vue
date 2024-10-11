<script setup lang="ts">
import { createClient, LoginRequiredError } from '@featherscloud/auth'

import { ref } from 'vue';

// Initialize the Feathers Cloud Auth client for your application
const appId = '<your-app-id>'
const auth = createClient({ appId })

const message = ref<string>('')

async function loadMessage() {
  try {
    // Get data with authentication from your server
    const response = await fetch('http://localhost:3030', {
      headers: {
        // Get the authorization header for each request
        Authorization: await auth.getHeader()
      }
    })
    const data = await response.json()
    message.value = data.message
  } catch (error) {
    // Redirect to the login page when login is required
    if (error instanceof LoginRequiredError) {
      window.location.href = await auth.getLoginUrl(error)
    } else {
      throw error
    }
  }
}

loadMessage()
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Feathers Cloud Auth VueJS demo</h1>
      <p>Message from the server is:</p>
      <h2><strong>{{ message }}</strong></h2>
    </div>
  </header>
</template>
