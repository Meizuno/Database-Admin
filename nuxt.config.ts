// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/icon'],

  runtimeConfig: {
    dbType: 'sqlite',
    dbUrl: 'sqlite::memory:',
    dbLogging: false
  }
})