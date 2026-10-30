import { Link } from 'react-router'
import { Ornament } from '@/shared/ui'

/** "Laura Muñoz Pérez." con el punto en burdeos + rombo + línea. */
export function Logo() {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/"
        className="font-display text-2xl leading-none whitespace-nowrap text-bone-100 sm:text-3xl"
        aria-label="Laura Muñoz Pérez — inicio"
      >
        Laura Muñoz Pérez<span className="text-wine-500">.</span>
      </Link>
      <Ornament className="hidden sm:block" />
      <span aria-hidden className="hidden h-px w-16 bg-ash-800 sm:block" />
    </div>
  )
}
