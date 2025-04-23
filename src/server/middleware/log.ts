export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  if (config.logging) {
    console.log('New request: ' + getRequestURL(event))
  }
})
