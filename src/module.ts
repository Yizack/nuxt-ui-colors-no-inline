import defu from 'defu'
import { addTemplate, defineNuxtModule } from '@nuxt/kit'
import type { ModuleOptions, NuxtUIExtendedOptions } from './types'
import { generateColorsCSS, getFilteredColors } from './utils'

export type { ModuleOptions, NuxtUIExtendedOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ui-colors-no-inline',
    configKey: 'ui',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  async setup(options, nuxt) {
    const uiColors = getFilteredColors(
      defu(options.colors, nuxt.options.appConfig.ui?.colors as NuxtUIExtendedOptions['colors']),
      options.theme?.colors,
    )

    nuxt.options.appConfig.ui ||= { colors: {} } as never
    nuxt.options.appConfig.ui.colors = uiColors

    if (nuxt.options.dev || nuxt.options.features.inlineStyles !== false) return

    // Remove the default colors plugin from @nuxt/ui in prod if inlineStyles config is disabled
    nuxt.hook('app:resolve', (app) => {
      app.plugins = app.plugins.filter(p => !p.src.includes('@nuxt/ui/dist/runtime/plugins/colors'))
    })

    const content = generateColorsCSS(uiColors, options.theme?.prefix)

    const colorsFile = addTemplate({
      filename: 'nuxt-ui-colors.css',
      write: true,
      getContents: () => content,
    })

    if (colorsFile.dst) {
      nuxt.options.css ||= []
      nuxt.options.css.push(colorsFile.dst)
    }
  },
})
