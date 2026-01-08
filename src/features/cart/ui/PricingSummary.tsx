import { calculatePrice } from '@shared/lib/calculatePrice'
import type { Artwork } from '@shared/lib/types'
import { Button } from '@shared/ui/button'
import { Package, RotateCcw, ShoppingCart, Trash2 } from 'lucide-react'

interface PricingSummaryProps {
  artworks: Artwork[]
  onAddToCart: () => void
  onDeleteArtwork?: (id: string) => void
  onReset?: () => void
}

export const PricingSummary = ({
  artworks,
  onAddToCart,
  onDeleteArtwork,
  onReset,
}: PricingSummaryProps) => {
  const prices = artworks.map(a => calculatePrice(a.config))
  const total = prices.reduce((sum, p) => sum + p, 0)

  return (
    <div className="rounded-xl bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6 shadow-sm ring-1 ring-primary/20">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-primary/10">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-semibold text-lg text-foreground">Pricing</h2>
      </div>

      {artworks.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Add images to calculate pricing
        </p>
      ) : (
        <div className="space-y-5">
          <div className="space-y-3">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="flex justify-between items-center py-2 border-b border-border/50 last:border-0 gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img
                      src={artwork.url || '/placeholder.svg'}
                      alt={`Artwork ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground block truncate">
                      Artwork {index + 1}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {artwork.config.size} cm
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-semibold text-foreground tabular-nums">
                    {calculatePrice(artwork.config).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}{' '}
                    €
                  </span>
                  {onDeleteArtwork && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onDeleteArtwork(artwork.id)}
                      title="Delete artwork"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t-2 border-primary/20">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-2xl text-primary tabular-nums">
                {total.toLocaleString('en-US', { minimumFractionDigits: 2 })} €
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={onAddToCart} className="w-full" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            {onReset && (
              <Button
                variant="outline"
                onClick={onReset}
                className="w-full"
                size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
