<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Nuxt - Note App'
const description = 'Take, Edit, Delete Notes. Keep your ideas organized'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader :toggle="false">
      <template #left>
        <NuxtLink to="/">
          <UAvatar
            src="/logo.png"
            size="3xl"
            class="size-12 rounded-full shadow-2xl"
          />
        </NuxtLink>
      </template>

      <template #right>
        <div class="flex items-center gap-2">
          <ULink
            to="https://www.instagram.com/thelinuxlighthouse"
            target="_blank"
          >
            <UIcon
              name="i-simple-icons-instagram"
              class="hover:text-pink-500 size-6 flex"
            />
          </ULink>
          <ColorModeButton />
        </div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-linux" />
  </UApp>
</template>
