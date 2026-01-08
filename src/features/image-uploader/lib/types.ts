export interface UseImageUploaderProps {
  onImagesSelected: (files: File[]) => void
  maxCount: number
  currentCount: number
}
