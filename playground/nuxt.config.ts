export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '../src/module',
  ],
  imports: {
    autoImport: true,
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/ui.tailwind.css',
  ],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  ui: {
    colorMode: true,
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
