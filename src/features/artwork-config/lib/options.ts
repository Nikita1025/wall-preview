import { BORDERS, EFFECTS, FRAMES, LABELS, SIZES } from './constants'

const FRAME_COLORS: Record<string, string> = {
  none: 'transparent',
  black: '#1a1a1a',
  white: '#f8f8f8',
  oak: '#b8956b',
}

export const createSizeOptions = () =>
  SIZES.map(value => ({
    value,
    label: LABELS[value] || value,
  }))

export const createFrameOptions = () =>
  FRAMES.map(value => ({
    value,
    label: LABELS[value] || value,
    color: FRAME_COLORS[value],
  }))

export const createEffectOptions = () =>
  EFFECTS.map(value => ({
    value,
    label: LABELS[value] || value,
  }))

export const createBorderOptions = () =>
  BORDERS.map(value => ({
    value,
    label: LABELS[value] || value,
  }))
