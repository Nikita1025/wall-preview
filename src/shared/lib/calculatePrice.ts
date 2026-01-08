import type { ArtworkConfig } from './types'

export const calculatePrice = (config: ArtworkConfig): number => {
  let price = 0
  const sizePrices: Record<string, number> = {
    '70×50': 25,
    '80×60': 32,
    '90×60': 38,
    '100×70': 45,
    '100×100': 55,
  }
  price += sizePrices[config.size] || 25
  const framePrices: Record<string, number> = {
    none: 0,
    black: 8,
    white: 8,
    oak: 12,
  }
  price += framePrices[config.frame] || 0
  const effectPrices: Record<string, number> = { matte: 0, gloss: 3, canvas: 6 }
  price += effectPrices[config.effect] || 0
  const borderPrices: Record<string, number> = { none: 0, small: 2, large: 4 }
  price += borderPrices[config.border] || 0
  return price
}
