import { useCallback, useEffect, useRef, useState } from 'react'
import { getFrameSize } from '../lib/getFrameSize'
import type { UseWallProps } from '../lib/types'

export const useWall = ({
  artworks,
  onPositionChange,
  onSelect,
}: UseWallProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [wallSize, setWallSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = width * (9 / 16)
        setWallSize({ width, height })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleDrag = useCallback(
    (id: string, deltaX: number, deltaY: number) => {
      const artwork = artworks.find(a => a.id === id)
      if (!artwork) return
      const baseSize = getFrameSize(artwork.config.size)
      const baseWallWidth = 800
      const baseWallHeight = 450
      const scale = Math.min(
        wallSize.width / baseWallWidth,
        wallSize.height / baseWallHeight
      )
      const baseWallWidthRem = baseWallWidth / 16
      const cmToRemRatio = baseWallWidthRem / 4 / 70
      const frameWidth = baseSize.width * cmToRemRatio * scale * 16
      const frameHeight = baseSize.height * cmToRemRatio * scale * 16
      const newX = Math.max(
        0,
        Math.min(wallSize.width - frameWidth, artwork.position.x + deltaX)
      )
      const newY = Math.max(
        0,
        Math.min(wallSize.height - frameHeight, artwork.position.y + deltaY)
      )
      onPositionChange(id, { x: newX, y: newY })
    },
    [artworks, wallSize, onPositionChange]
  )

  const handleWallClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement
      if (
        target === e.currentTarget ||
        target.closest('[data-empty-state]') !== null
      ) {
        onSelect(null)
      }
    },
    [onSelect]
  )

  return {
    containerRef,
    wallSize,
    handleDrag,
    handleWallClick,
  }
}
