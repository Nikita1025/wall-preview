import { useCallback, useRef, useState } from 'react'
import type { UseImageUploaderProps } from '../lib/types'

export const useImageUploader = ({
  onImagesSelected,
  maxCount,
  currentCount,
}: UseImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const remaining = maxCount - currentCount

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      const imageFiles = files.filter(f => f.type.startsWith('image/'))
      if (imageFiles.length > 0) {
        onImagesSelected(imageFiles)
      }
      e.target.value = ''
    },
    [onImagesSelected]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const files = Array.from(e.dataTransfer.files)
      const imageFiles = files.filter(f => f.type.startsWith('image/'))
      if (imageFiles.length > 0) {
        onImagesSelected(imageFiles)
      }
    },
    [onImagesSelected]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false)
  }, [])

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return {
    inputRef,
    isDragOver,
    remaining,
    handleChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleClick,
  }
}
