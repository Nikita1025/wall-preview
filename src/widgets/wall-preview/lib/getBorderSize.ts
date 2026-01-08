export const getBorderSize = (
  border: string,
  frameSizeInRem?: { width: number; height: number }
): string => {
  let percentage = 0

  if (frameSizeInRem) {
    const frameWidthPx = frameSizeInRem.width * 16
    const frameHeightPx = frameSizeInRem.height * 16
    const minDimensionPx = Math.min(frameWidthPx, frameHeightPx)

    if (minDimensionPx < 50) {
      percentage = border === 'small' ? 2 : 3.5
    } else if (minDimensionPx < 100) {
      percentage = border === 'small' ? 2.5 : 4.5
    } else {
      percentage = border === 'small' ? 3 : 5.5
    }
  } else {
    percentage = border === 'small' ? 3 : 5.5
  }

  switch (border) {
    case 'small':
      return `${percentage}%`
    case 'large':
      return `${percentage}%`
    default:
      return '0'
  }
}
