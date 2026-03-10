/**
 * Credits: inspired by `@nuxt/ui`'s runtime colors plugin.
 * @see https://github.com/nuxt/ui/blob/v4/src/runtime/plugins/colors.ts
 */

import colors from 'tailwindcss/colors'
import type { CustomColorOptions } from './types'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function getColor(color: keyof typeof colors, shade: typeof shades[number]): string {
  if (color in colors && typeof colors[color] === 'object' && shade in colors[color]) {
    return colors[color][shade] as string
  }
  return ''
}

function generateShades(key: string, value: string, prefix?: string) {
  const prefixStr = prefix ? `${prefix}-` : ''
  return `${shades.map(shade => `--ui-color-${key}-${shade}: var(--${prefixStr}color-${value === 'neutral' ? 'old-neutral' : value}-${shade}, ${getColor(value as keyof typeof colors, shade)});`).join('\n  ')}`
}

function generateColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`
}

export function generateColorsCSS(colorsConfig: CustomColorOptions, prefix?: string) {
  const { neutral, ...colors } = colorsConfig

  return `@layer theme {
  :root, :host {
  ${Object.entries(colorsConfig).map(([key, value]) => generateShades(key, value as string, prefix)).join('\n  ')}
  }
  :root, :host, .light {
  ${Object.keys(colors).map(key => generateColor(key, 500)).join('\n  ')}
  }
  .dark {
  ${Object.keys(colors).map(key => generateColor(key, 400)).join('\n  ')}
  }
}`
}

export const getFilteredColors = (uiColors: CustomColorOptions, themeColors: string[] = []) => {
  const allowedColors = themeColors ? [...themeColors, 'neutral'] : ['neutral']
  const filteredColors = Object.fromEntries(
    Object.entries(uiColors).filter(([color]) => allowedColors.includes(color)),
  )
  return filteredColors as Required<CustomColorOptions>
}
