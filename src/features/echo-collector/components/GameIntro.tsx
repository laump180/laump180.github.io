import { Ornament } from '@/shared/ui'

interface GameIntroProps {
  /** Muestra la ayuda de controles (solo mientras se juega, como en el mockup en reposo). */
  showControls: boolean
}

export function GameIntro({ showControls }: GameIntroProps) {
  return (
    <div className="relative p-5 lg:py-4 lg:pr-2 lg:pl-6">
      <div className="flex h-full flex-col justify-center gap-3.5 lg:border-l lg:border-ash-800 lg:pl-6">
        <h2 id="echo-collector-title" className="text-sm tracking-caps text-bone-100 uppercase">
          Echo Collector
        </h2>
        <span aria-hidden className="h-px w-full max-w-[184px] bg-ash-800" />
        <p className="text-[15px] leading-snug text-ash-300">
          Recoge todos los ecos
          <br className="hidden lg:block" /> en el menor tiempo posible.
        </p>
        <p className={showControls ? 'text-xs leading-snug text-ash-500' : 'sr-only'}>
          <span className="pointer-coarse:hidden">
            ← → / A D · moverte
            <br />
            Espacio / W · saltar
          </span>
          <span className="hidden pointer-coarse:inline">
            Toca un lado para moverte · desliza arriba para saltar
          </span>
        </p>
      </div>
      <Ornament
        variant="sparkle"
        className="absolute bottom-3 left-[1.15rem] hidden size-2 text-ash-500 lg:block"
      />
    </div>
  )
}
