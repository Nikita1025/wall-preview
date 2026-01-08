export const getFrameSize = (
  size: string
): { width: number; height: number } => {
  const sizes: Record<string, { width: number; height: number }> = {
    '70×50': { width: 70, height: 50 },
    '80×60': { width: 80, height: 60 },
    '90×60': { width: 90, height: 60 },
    '100×70': { width: 100, height: 70 },
    '100×100': { width: 100, height: 100 },
  }
  return sizes[size] || sizes['70×50']
}
