import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

await setup({ rootDir: fileURLToPath(new URL('./fixtures/no-inline', import.meta.url)) })

describe('ssr', () => {
  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('nuxt-ui-colors-no-inline')
  })

  it('should not render nuxt-ui-colors style tag', async () => {
    const html = await $fetch('/')
    expect(html).not.toContain('<style id="nuxt-ui-colors">')
  })
})
