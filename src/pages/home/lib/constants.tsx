import type { ArtworkConfig } from '@shared/lib/types'
import { Package, Settings2 } from 'lucide-react'
import type { Tab } from './types'

export const DEFAULT_CONFIG: ArtworkConfig = {
  size: '70×50',
  frame: 'none',
  effect: 'matte',
  border: 'none',
}

export const MOBILE_TABS: Tab[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings2 className="h-4 w-4" />,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: <Package className="h-4 w-4" />,
  },
]
