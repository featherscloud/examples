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
    <div class="wrapper">
      <h1>Feathers Auth VueJS demo</h1>
      <p>Message from the server is:</p>
      <h2><strong>{{ message }}</strong></h2>
    </div>
  </header>
</template>
