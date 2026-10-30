import type { ElementType, ReactNode } from 'react'
import { useInView } from '@/shared/hooks/useInView'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import { cn } from '@/shared/lib/cn'

interface RevealProps {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
}

/** Fade + slide al entrar en el viewport. Sin animación con prefers-reduced-motion. */
export function Reveal({ as: Tag = 'div', delay = 0, className, children }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  const reducedMotion = usePrefersReducedMotion()
  const state = reducedMotion ? '' : inView ? 'animate-reveal' : 'reveal-init'

  return (
    <Tag
      ref={ref}
      className={cn(state, className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
