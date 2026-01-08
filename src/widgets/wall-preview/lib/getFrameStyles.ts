import type React from 'react'

export const getFrameStyles = (frame: string): React.CSSProperties => {
  switch (frame) {
    case 'black':
      return {
        borderWidth: '0.625rem',
        borderStyle: 'solid',
        borderColor: '#1a1a1a',
        boxShadow:
          'inset 0 0 0 0.0625rem rgba(255,255,255,0.08), inset 0.125rem 0.125rem 0.25rem rgba(0,0,0,0.3)',
        background: 'linear-gradient(145deg, #2a2a2a, #0a0a0a)',
      }
    case 'white':
      return {
        borderWidth: '0.625rem',
        borderStyle: 'solid',
        borderColor: '#f8f8f8',
        boxShadow:
          'inset 0 0 0 0.0625rem rgba(0,0,0,0.03), inset -0.125rem -0.125rem 0.25rem rgba(0,0,0,0.05)',
        background: 'linear-gradient(145deg, #ffffff, #efefef)',
      }
    case 'oak':
      return {
        borderWidth: '0.75rem',
        borderStyle: 'solid',
        borderColor: '#b8956b',
        boxShadow:
          'inset 0 0 0 0.0625rem rgba(0,0,0,0.1), inset 0.125rem 0.125rem 0.25rem rgba(0,0,0,0.15)',
        background: 'linear-gradient(145deg, #d4a574, #8b6914)',
      }
    default:
      return {}
  }
}
