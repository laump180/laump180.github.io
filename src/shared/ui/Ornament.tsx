import type { CSSProperties } from 'react'
import { cn } from '@/shared/lib/cn'
import { DiamondIcon, SparkleIcon } from './icons'

interface OrnamentProps {
  variant?: 'diamond' | 'sparkle'
  /** Brillo pulsante (se desactiva con prefers-reduced-motion). */
  twinkle?: boolean
  className?: string
  style?: CSSProperties
}

/** Rombo o destello decorativo. Siempre aria-hidden. */
export function Ornament({
  variant = 'diamond',
  twinkle = false,
  className,
  style,
}: OrnamentProps) {
  const Icon = variant === 'diamond' ? DiamondIcon : SparkleIcon
  return (
    <Icon
      style={style}
      className={cn(
        'inline-block shrink-0',
        variant === 'diamond' ? 'size-2.5 text-ash-500' : 'size-3 text-ash-300',
        twinkle && 'animate-twinkle motion-reduce:animate-none',
        className,
      )}
    />
  )
}
