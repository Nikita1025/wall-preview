import { getFrameSize } from '@shared/lib/getFrameSize'
import type { Artwork } from '@shared/lib/types'

const baseWallWidth = 800
const baseWallWidthRem = baseWallWidth / 16
const cmToRemRatio = baseWallWidthRem / 4 / 70

const minWallWidth = 320
const minWallHeight = 180

const getArtworkPixelSize = (
  size: string
): { width: number; height: number } => {
  const baseSize = getFrameSize(size)

  const scale = 1
  const frameWidth = baseSize.width * cmToRemRatio * scale * 16
  const frameHeight = baseSize.height * cmToRemRatio * scale * 16

  return { width: frameWidth, height: frameHeight }
}

const doRectsIntersect = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

export const getRandomPosition = (
  existingArtworks: Artwork[],
  newArtworkSize: string
): { x: number; y: number } => {
  const minScale = minWallWidth / baseWallWidth

  const baseSize = getArtworkPixelSize(newArtworkSize)
  const newSize = {
    width: baseSize.width * minScale,
    height: baseSize.height * minScale,
  }

  const padding = 10
  const maxX = Math.max(padding, minWallWidth - newSize.width - padding)
  const maxY = Math.max(padding, minWallHeight - newSize.height - padding)

  const existingRects = existingArtworks.map(art => {
    const artBaseSize = getArtworkPixelSize(art.config.size)
    const size = {
      width: artBaseSize.width * minScale,
      height: artBaseSize.height * minScale,
    }

    const scaledX =
      art.position.x > minWallWidth ? art.position.x * minScale : art.position.x
    const scaledY =
      art.position.y > minWallHeight
        ? art.position.y * minScale
        : art.position.y

    return {
      x: scaledX,
      y: scaledY,
      width: size.width,
      height: size.height,
    }
  })

  for (let i = 0; i < 50; i++) {
    const x = padding + Math.random() * (maxX - padding)
    const y = padding + Math.random() * (maxY - padding)

    const newRect = {
      x,
      y,
      width: newSize.width,
      height: newSize.height,
    }

    const hasIntersection = existingRects.some(existingRect => {
      const paddedRect = {
        x: existingRect.x - padding,
        y: existingRect.y - padding,
        width: existingRect.width + padding * 2,
        height: existingRect.height + padding * 2,
      }
      return doRectsIntersect(newRect, paddedRect)
    })

    if (!hasIntersection) {
      return { x, y }
    }
  }

  const stepX = newSize.width + padding * 2
  const stepY = newSize.height + padding * 2
  const gridCols = Math.floor((maxX - padding) / stepX)
  const gridRows = Math.floor((maxY - padding) / stepY)

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const x = padding + col * stepX
      const y = padding + row * stepY

      const newRect = {
        x,
        y,
        width: newSize.width,
        height: newSize.height,
      }

      const hasIntersection = existingRects.some(existingRect => {
        const paddedRect = {
          x: existingRect.x - padding,
          y: existingRect.y - padding,
          width: existingRect.width + padding * 2,
          height: existingRect.height + padding * 2,
        }
        return doRectsIntersect(newRect, paddedRect)
      })

      if (!hasIntersection) {
        return { x, y }
      }
    }
  }

  const corners = [
    { x: padding, y: padding },
    { x: Math.max(padding, maxX), y: padding },
    { x: padding, y: Math.max(padding, maxY) },
    { x: Math.max(padding, maxX), y: Math.max(padding, maxY) },
  ]
  return corners[Math.floor(Math.random() * corners.length)]
}
