// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],

  srcDir: 'src/',

  runtimeConfig: {
    dbType: 'postgres',
    dbUrl: 'postgres://username:password@postgres:5432/postgres',
    dbLogging: false,
    logging: false
  }
})