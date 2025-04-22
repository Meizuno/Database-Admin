import { describe, test, expect } from 'vitest'
import { setup, fetch } from '@nuxt/test-utils/e2e'

describe('Health check all services', async () => {
  await setup({
    server: true    
  })

  test('Database health check', async () => {
    const config = useRuntimeConfig()

    const response = await fetch('/api/healthcheck/database')
    const body = await response.json()
    const dbType = config.dbType

    expect(response.status).toBe(200)
    expect(body).toHaveProperty('status', 'ok')
    expect(body).toHaveProperty('dbType', dbType)
  })
})
