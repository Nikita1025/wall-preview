import type React from 'react'

export const getEffectStyles = (effect: string): React.CSSProperties => {
  switch (effect) {
    case 'gloss':
      return {
        filter: 'saturate(1.15) contrast(1.05)',
      }
    case 'canvas':
      return {
        filter: 'contrast(0.95) brightness(1.02)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
      }
    default:
      return {}
  }
}
