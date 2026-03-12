// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/hints',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    priority: ['bunny', 'google']
  }
})
