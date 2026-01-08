export interface ArtworkConfig {
  size: string
  frame: string
  effect: string
  border: string
}

export interface Artwork {
  id: string
  file: File
  url: string
  position: { x: number; y: number }
  config: ArtworkConfig
}
