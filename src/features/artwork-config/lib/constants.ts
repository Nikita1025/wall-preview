import { Frame, Layers, Maximize2, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { createElement } from 'react'

export const SIZES = ['70×50', '80×60', '90×60', '100×70', '100×100']
export const FRAMES = ['none', 'black', 'white', 'oak']
export const EFFECTS = ['matte', 'gloss', 'canvas']
export const BORDERS = ['none', 'small', 'large']

export const LABELS: Record<string, string> = {
  '70×50': '70×50',
  '80×60': '80×60',
  '90×60': '90×60',
  '100×70': '100×70',
  '100×100': '100×100',
  none: 'None',
  black: 'Black',
  white: 'White',
  oak: 'Oak',
  matte: 'Matte',
  gloss: 'Gloss',
  canvas: 'Canvas',
  small: 'Small',
  large: 'Large',
}

export const ICONS: Record<string, ReactNode> = {
  size: createElement(Maximize2, { className: 'h-4 w-4' }),
  frame: createElement(Frame, { className: 'h-4 w-4' }),
  effect: createElement(Sparkles, { className: 'h-4 w-4' }),
  border: createElement(Layers, { className: 'h-4 w-4' }),
}
