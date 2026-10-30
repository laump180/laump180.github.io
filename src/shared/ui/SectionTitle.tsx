import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import { Ornament } from './Ornament'

interface SectionTitleProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  /** Contenido a la derecha de la línea (p. ej. "Ver todos →"). */
  action?: ReactNode
  className?: string
}

/** Título + rombo + línea que se extiende hasta el final. */
export function SectionTitle({
  children,
  as: Tag = 'h2',
  id,
  action,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('flex items-center gap-4 sm:gap-6', className)}>
      <Tag id={id} className="font-display text-3xl leading-none text-bone-100 sm:text-4xl">
        {children}
      </Tag>
      <Ornament />
      <span aria-hidden className="h-px flex-1 bg-ash-800" />
      {action}
    </div>
  )
}
