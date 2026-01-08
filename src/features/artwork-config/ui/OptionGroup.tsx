import { cn } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'

import type { ReactNode } from 'react'

interface Option {
  value: string
  label: string
  color?: string
}

interface OptionGroupProps {
  label: string
  icon: ReactNode
  options: Option[]
  value: string
  onChange: (value: string) => void
  colorPreview?: boolean
}

export const OptionGroup = ({
  label,
  icon,
  options,
  value,
  onChange,
  colorPreview = false,
}: OptionGroupProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <label className="text-sm font-medium text-foreground">{label}</label>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <Button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            variant={value === option.value ? 'default' : 'outline'}
            size="sm"
            className={cn(
              value === option.value
                ? 'border border-primary'
                : 'border-border hover:text-white'
            )}
          >
            {colorPreview && option.color && option.color !== 'transparent' && (
              <span
                className={cn(
                  'inline-block w-3 h-3 rounded-full mr-2',
                  option.color === '#ffffff' ? 'border border-border/60' : ''
                )}
                style={{
                  backgroundColor: option.color,
                }}
              />
            )}
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
