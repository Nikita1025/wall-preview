import type { ReactNode } from 'react'

export type MobileTab = 'settings' | 'pricing'
export interface Tab {
  id: string
  label: string
  icon: ReactNode
}
