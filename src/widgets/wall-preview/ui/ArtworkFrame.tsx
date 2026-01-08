import type { Artwork } from '@shared/lib/types'
import { cn } from '@shared/lib/utils'
import { getBorderSize } from '../lib/getBorderSize'
import { getEffectStyles } from '../lib/getEffectStyles'
import { getFrameSize } from '../lib/getFrameSize'
import { getFrameStyles } from '../lib/getFrameStyles'
import { useArtworkFrame } from '../model/useArtworkFrame'

interface ArtworkFrameProps {
  artwork: Artwork
  isActive: boolean
  onSelect: () => void
  onDrag: (deltaX: number, deltaY: number) => void
  wallSize: { width: number; height: number }
}

export const ArtworkFrame = ({
  artwork,
  isActive,
  onSelect,
  onDrag,
  wallSize,
}: ArtworkFrameProps) => {
  const { config, position, url } = artwork

  const baseSize = getFrameSize(config.size)

  const baseWallWidth = 800
  const baseWallHeight = 450
  const scale = Math.min(
    wallSize.width / baseWallWidth,
    wallSize.height / baseWallHeight
  )

  const baseWallWidthRem = baseWallWidth / 16
  const cmToRemRatio = baseWallWidthRem / 4 / 70
  const displayWidth = `${baseSize.width * cmToRemRatio * scale}rem`
  const displayHeight = `${baseSize.height * cmToRemRatio * scale}rem`

  const frameStyles = getFrameStyles(config.frame)
  const effectStyles = getEffectStyles(config.effect)

  const scaledFrameWidth = baseSize.width * cmToRemRatio * scale
  const scaledFrameHeight = baseSize.height * cmToRemRatio * scale
  const borderSize = getBorderSize(config.border, {
    width: scaledFrameWidth,
    height: scaledFrameHeight,
  })

  const {
    frameRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useArtworkFrame({
    onSelect,
    onDrag,
  })

  return (
    <div
      ref={frameRef}
      className={cn(
        'absolute cursor-grab select-none',
        'touch-none active:cursor-grabbing',
        !isDragging && 'transition-[left,top,filter] duration-200',
        isDragging && 'cursor-grabbing scale-[1.02]',
        isActive &&
          'ring-2 ring-primary/70 ring-offset-2 sm:ring-offset-4 ring-offset-transparent'
      )}
      style={{
        left: `${position.x / 16}rem`,
        top: `${position.y / 16}rem`,
        width: displayWidth,
        height: displayHeight,
        touchAction: 'none',
        willChange: isDragging ? 'left, top' : undefined,
        transition: isDragging ? 'none' : undefined,
        filter: isDragging
          ? 'drop-shadow(0 0.75rem 1.5rem rgba(0,0,0,0.15))'
          : 'drop-shadow(0 0.5rem 1.5rem rgba(0,0,0,0.12))',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        isolation: 'isolate',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={e => e.stopPropagation()}
    >
      <div className="absolute inset-0 rounded-sm" style={frameStyles} />

      <div
        className="absolute"
        style={{
          inset: frameStyles.borderWidth ? frameStyles.borderWidth : 0,
          padding: borderSize,
          backgroundColor: '#fafafa',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div
          className="w-full h-full overflow-hidden relative"
          style={effectStyles}
        >
          <img
            src={url || '/placeholder.svg'}
            alt="Artwork"
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
