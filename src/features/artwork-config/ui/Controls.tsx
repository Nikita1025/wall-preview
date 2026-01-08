import type { Artwork, ArtworkConfig } from '@shared/lib/types'
import { Settings2 } from 'lucide-react'
import { ICONS } from '../lib/constants'
import {
  createBorderOptions,
  createEffectOptions,
  createFrameOptions,
  createSizeOptions,
} from '../lib/options'
import { OptionGroup } from './OptionGroup'

interface ControlsProps {
  artwork: Artwork | undefined
  onConfigChange: (config: Partial<ArtworkConfig>) => void
}

export const Controls = ({ artwork, onConfigChange }: ControlsProps) => {
  if (!artwork) {
    return (
      <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-muted">
            <Settings2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="font-semibold text-lg text-foreground">Settings</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Select an artwork on the wall to customize its settings
        </p>
      </div>
    )
  }

  const { config } = artwork

  return (
    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border/50 space-y-5">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Settings2 className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-semibold text-lg text-foreground">Settings</h2>
      </div>

      <OptionGroup
        label="Size"
        icon={ICONS.size}
        options={createSizeOptions()}
        value={config.size}
        onChange={size => onConfigChange({ size })}
      />

      <OptionGroup
        label="Frame"
        icon={ICONS.frame}
        options={createFrameOptions()}
        value={config.frame}
        onChange={frame => onConfigChange({ frame })}
        colorPreview
      />

      <OptionGroup
        label="Effect"
        icon={ICONS.effect}
        options={createEffectOptions()}
        value={config.effect}
        onChange={effect => onConfigChange({ effect })}
      />

      <OptionGroup
        label="Passepartout"
        icon={ICONS.border}
        options={createBorderOptions()}
        value={config.border}
        onChange={border => onConfigChange({ border })}
      />
    </div>
  )
}
