import type { Artwork } from '@shared/lib/types'

export interface UseArtworkFrameProps {
  onSelect: () => void
  onDrag: (deltaX: number, deltaY: number) => void
}

export interface UseWallProps {
  artworks: Artwork[]
  onPositionChange: (id: string, position: { x: number; y: number }) => void
  onSelect: (id: string | null) => void
}
