import { cn } from '@/shared/lib/cn'
import { Ornament } from './Ornament'

interface Sparkle {
  top: string
  left: string
  size: string
  delay: string
}

const SPARKLES: readonly Sparkle[] = [
  { top: '14%', left: '3%', size: 'size-2', delay: '0s' },
  { top: '31%', left: '4%', size: 'size-1.5', delay: '1.2s' },
  { top: '44%', left: '3%', size: 'size-2', delay: '2.4s' },
  { top: '9%', left: '37%', size: 'size-1.5', delay: '0.6s' },
  { top: '62%', left: '49%', size: 'size-2', delay: '1.8s' },
  { top: '96%', left: '50%', size: 'size-2', delay: '0.3s' },
  { top: '78%', left: '97%', size: 'size-1.5', delay: '2.9s' },
  { top: '22%', left: '96%', size: 'size-2', delay: '1.5s' },
]

/** Destellos ✦ decorativos esparcidos sobre un contenedor relativo. */
export function SparkleField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {SPARKLES.map((s) => (
        <span key={`${s.top}-${s.left}`} className="absolute" style={{ top: s.top, left: s.left }}>
          <Ornament
            variant="sparkle"
            twinkle
            className={cn(s.size, 'text-ash-500')}
            style={{ animationDelay: s.delay }}
          />
        </span>
      ))}
    </div>
  )
}
