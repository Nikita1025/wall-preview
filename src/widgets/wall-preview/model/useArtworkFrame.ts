import { useCallback, useRef, useState } from 'react'
import type { UseArtworkFrameProps } from '../lib/types'

export const useArtworkFrame = ({ onSelect, onDrag }: UseArtworkFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const lastPosition = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ x: 0, y: 0 })

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onSelect()
      setIsDragging(true)
      lastPosition.current = { x: e.clientX, y: e.clientY }
      dragOffset.current = { x: 0, y: 0 }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [onSelect]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const deltaX = e.clientX - lastPosition.current.x
      const deltaY = e.clientY - lastPosition.current.y
      lastPosition.current = { x: e.clientX, y: e.clientY }
      dragOffset.current.x += deltaX
      dragOffset.current.y += deltaY
      onDrag(deltaX, deltaY)
    },
    [isDragging, onDrag]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      setIsDragging(false)
      dragOffset.current = { x: 0, y: 0 }
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    },
    [isDragging]
  )

  return {
    frameRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  }
}
