import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

await setup({ rootDir: fileURLToPath(new URL('./fixtures/inline', import.meta.url)) })

describe('inline', async () => {
  it('should render nuxt-ui-colors style tag', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<style id="nuxt-ui-colors">')
  })
})
