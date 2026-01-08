import { cn } from '@shared/lib/utils'
import { Button } from '@shared/ui/button'
import { ImagePlus, Upload } from 'lucide-react'
import { useImageUploader } from '../model/useImageUploader'

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void
  currentCount: number
  maxCount: number
}

export const ImageUploader = ({
  onImagesSelected,
  currentCount,
  maxCount,
}: ImageUploaderProps) => {
  const {
    inputRef,
    isDragOver,
    remaining,
    handleChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleClick,
  } = useImageUploader({
    onImagesSelected,
    maxCount,
    currentCount,
  })

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden',
        isDragOver
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : 'border-border/60 bg-card hover:border-primary/40 hover:bg-muted/30',
        remaining <= 0 && 'opacity-50 pointer-events-none'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
        disabled={remaining <= 0}
      />

      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div
          className={cn(
            'shrink-0 p-3 sm:p-4 rounded-xl transition-colors',
            isDragOver ? 'bg-primary/10' : 'bg-muted'
          )}
        >
          {isDragOver ? (
            <ImagePlus className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          ) : (
            <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left w-full sm:w-auto">
          <p className="font-medium text-foreground text-sm sm:text-base">
            {isDragOver ? 'Drop to upload' : 'Upload images'}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {remaining > 0
              ? `Drag files here or click the button. Remaining: ${remaining} of ${maxCount}`
              : 'Maximum images reached'}
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={handleClick}
          disabled={remaining <= 0}
          className="shrink-0 w-full sm:w-auto"
        >
          <ImagePlus className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Browse</span>
          <span className="sm:hidden">Select Files</span>
        </Button>
      </div>

      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary/60 transition-all duration-300"
          style={{ width: `${(currentCount / maxCount) * 100}%` }}
        />
      </div>
    </div>
  )
}
