import { cn } from '@shared/lib/utils'
import type { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  icon: ReactNode
}

interface MobileTabSwitcherProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export const MobileTabSwitcher = ({
  tabs,
  activeTab,
  onTabChange,
}: MobileTabSwitcherProps) => {
  return (
    <div className="flex gap-2 p-1 bg-muted/50 rounded-lg lg:hidden">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all',
            activeTab === tab.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
