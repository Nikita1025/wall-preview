import { Frame } from 'lucide-react'

interface HeaderProps {
  title?: string
  subtitle?: string
}

export const Header = ({
  title = 'Art Wall Studio',
  subtitle = 'Create your perfect composition',
}: HeaderProps) => {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Frame className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
