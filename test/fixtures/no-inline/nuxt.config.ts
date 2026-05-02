import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    MyModule,
  ],
  css: [
    '~/assets/css/ui.tailwind.css',
  ],
  ui: {
    colorMode: false,
    fonts: false,
    theme: {
      colors: ['secondary'],
    },
    colors: {
      secondary: 'violet',
    },
  },
  features: {
    inlineStyles: false,
  },
  compatibilityDate: '2026-03-09',
})
