import type { ModuleOptions as NuxtUIModuleOptions } from '@nuxt/ui'
import type colors from 'tailwindcss/colors'

type Color = 'neutral' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | (string & {})
export type CustomColorOptions = Partial<Record<Color, keyof typeof colors>>

export interface NuxtUIExtendedOptions extends NuxtUIModuleOptions {
  colors?: CustomColorOptions
}

export type ModuleOptions = NuxtUIExtendedOptions

declare module '@nuxt/schema' {
  interface NuxtConfig {
    ui?: ModuleOptions
  }
}
