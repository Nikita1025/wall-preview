import { cn } from '@shared/lib/utils'
import type { ReactNode } from 'react'

interface TabContentProps {
  children: ReactNode
  isActive: boolean
  className?: string
}

export const TabContent = ({
  children,
  isActive,
  className,
}: TabContentProps) => {
  return (
    <div className={cn('lg:block', isActive ? 'block' : 'hidden', className)}>
      {children}
    </div>
  )
}
