import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'
import { FrameCornerIcon } from './icons'

const corners = [
  'top-0 left-0',
  'top-0 right-0 rotate-90',
  'right-0 bottom-0 rotate-180',
  'bottom-0 left-0 -rotate-90',
] as const

/** Panel con borde fino y esquinas ornamentadas. */
export function FramedPanel({ className, children, ...rest }: ComponentProps<'section'>) {
  return (
    <section className={cn('relative border border-ash-800 p-1.5', className)} {...rest}>
      {corners.map((position) => (
        <FrameCornerIcon
          key={position}
          className={cn('pointer-events-none absolute z-10 -m-1.5 size-5 text-ash-500', position)}
        />
      ))}
      <div className="relative h-full border border-ash-800/60">{children}</div>
    </section>
  )
}
