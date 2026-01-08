import type { Artwork } from '@shared/lib/types'
import { ImageIcon } from 'lucide-react'
import { useWall } from '../model/useWall'
import { ArtworkFrame } from './ArtworkFrame'

interface WallProps {
  artworks: Artwork[]
  activeId: string | null
  onSelect: (id: string | null) => void
  onPositionChange: (id: string, position: { x: number; y: number }) => void
}

export const Wall = ({
  artworks,
  activeId,
  onSelect,
  onPositionChange,
}: WallProps) => {
  const { containerRef, wallSize, handleDrag, handleWallClick } = useWall({
    artworks,
    onPositionChange,
    onSelect,
  })

  return (
    <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-border/50">
      <div
        ref={containerRef}
        className="relative w-full cursor-pointer"
        style={{
          height: wallSize.height || 'auto',
          aspectRatio: wallSize.height ? undefined : '16/9',
          minHeight: '12.5rem',
        }}
        onClick={handleWallClick}
      >
        {artworks.length === 0 && (
          <div
            data-empty-state
            className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2 sm:gap-3 p-4"
          >
            <div className="p-3 sm:p-4 rounded-full bg-muted/50">
              <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-center px-4">
              Upload images to display on the wall
            </p>
          </div>
        )}

        {artworks.map(artwork => (
          <ArtworkFrame
            key={artwork.id}
            artwork={artwork}
            isActive={artwork.id === activeId}
            onSelect={() => onSelect(artwork.id)}
            onDrag={(dx, dy) => handleDrag(artwork.id, dx, dy)}
            wallSize={wallSize}
          />
        ))}
      </div>
    </div>
  )
}
