<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <div>
    <UError
      :error="{
        statusCode: 404,
        statusMessage: 'Page not found',
        message: 'The page you are looking for does not exist.'
      }"
      :clear="{
        size: 'xl',
        icon: 'i-lucide-arrow-left',
        class: 'rounded-full'
      }"
      :ui="{ statusCode: 'text-8xl text-shadow-lg', statusMessage: 'text-primary text-shadow-lg', message: 'text-shadow-lg' }"
    />
  </div>
</template>
