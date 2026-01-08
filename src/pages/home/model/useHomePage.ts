import { calculatePrice } from '@shared/lib/calculatePrice'
import type { Artwork, ArtworkConfig } from '@shared/lib/types'
import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DEFAULT_CONFIG } from '../lib/constants'
import type { MobileTab } from '../lib/types'

export const useHomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mobileTab, setMobileTab] = useState<MobileTab>('settings')

  const handleImagesSelected = useCallback(
    (files: File[]) => {
      const newArtworks: Artwork[] = files
        .slice(0, 3 - artworks.length)
        .map((file, index) => ({
          id: uuidv4(),
          file,
          url: URL.createObjectURL(file),
          position: { x: 100 + index * 180, y: 80 },
          config: { ...DEFAULT_CONFIG },
        }))

      setArtworks(prev => [...prev, ...newArtworks].slice(0, 3))
      if (newArtworks.length > 0 && !activeId) {
        setActiveId(newArtworks[0].id)
      }
    },
    [artworks.length, activeId]
  )

  const handlePositionChange = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setArtworks(prev =>
        prev.map(art => (art.id === id ? { ...art, position } : art))
      )
    },
    []
  )

  const handleConfigChange = useCallback(
    (config: Partial<ArtworkConfig>) => {
      if (!activeId) return
      setArtworks(prev =>
        prev.map(art =>
          art.id === activeId
            ? { ...art, config: { ...art.config, ...config } }
            : art
        )
      )
    },
    [activeId]
  )

  const handleAddToCart = useCallback(() => {
    const cartData = {
      artworks: artworks.map(art => ({
        id: art.id,
        fileName: art.file.name,
        position: art.position,
        config: art.config,
      })),
      totalPrice: artworks.reduce(
        (sum, art) => sum + calculatePrice(art.config),
        0
      ),
    }
    console.log('Added to cart:', cartData)
    localStorage.setItem('wallPreviewCart', JSON.stringify(cartData))
    alert('Added to cart successfully')
  }, [artworks])

  const handleDeleteArtwork = useCallback(
    (id: string) => {
      setArtworks(prev => {
        const newArtworks = prev.filter(art => art.id !== id)
        const artwork = prev.find(art => art.id === id)
        if (artwork?.url) {
          URL.revokeObjectURL(artwork.url)
        }
        return newArtworks
      })
      if (activeId === id) {
        setActiveId(null)
      }
    },
    [activeId]
  )

  const handleReset = useCallback(() => {
    artworks.forEach(art => {
      if (art.url) {
        URL.revokeObjectURL(art.url)
      }
    })
    setArtworks([])
    setActiveId(null)
  }, [artworks])

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (tabId === 'settings' || tabId === 'pricing') {
        setMobileTab(tabId as MobileTab)
      }
    },
    [setMobileTab]
  )

  const activeArtwork = artworks.find(a => a.id === activeId)

  return {
    artworks,
    activeId,
    activeArtwork,
    setActiveId,
    handleImagesSelected,
    handlePositionChange,
    handleConfigChange,
    handleAddToCart,
    handleDeleteArtwork,
    handleReset,
    mobileTab,
    setMobileTab,
    handleTabChange,
  }
}
