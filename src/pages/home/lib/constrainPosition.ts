import { getFrameSize } from '@shared/lib/getFrameSize'

const baseWallWidth = 800
const baseWallWidthRem = baseWallWidth / 16
const cmToRemRatio = baseWallWidthRem / 4 / 70

const minWallWidth = 320
const minWallHeight = 180

export const constrainPosition = (
  position: { x: number; y: number },
  size: string
): { x: number; y: number } => {
  const baseSize = getFrameSize(size)
  const minScale = minWallWidth / baseWallWidth

  const frameWidth = baseSize.width * cmToRemRatio * minScale * 16
  const frameHeight = baseSize.height * cmToRemRatio * minScale * 16

  const scaledX = position.x > minWallWidth ? position.x * minScale : position.x
  const scaledY =
    position.y > minWallHeight ? position.y * minScale : position.y

  const constrainedX = Math.max(0, Math.min(minWallWidth - frameWidth, scaledX))
  const constrainedY = Math.max(
    0,
    Math.min(minWallHeight - frameHeight, scaledY)
  )

  return { x: constrainedX, y: constrainedY }
}
