import type { RefObject } from 'react'
import { cn } from '@/shared/lib/cn'
import type { EchoCollectorState } from '../hooks/useEchoCollector'
import { formatTime } from './format'

interface GameCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>
  state: EchoCollectorState
}

function describe({ status, collected, total, time, failed }: EchoCollectorState): string {
  if (failed) return 'Echo Collector: no se pudo cargar el minijuego.'
  if (status === 'playing') {
    return `Echo Collector en curso: ${collected} de ${total} ecos recogidos. Usa las flechas o A y D para moverte y Espacio o W para saltar.`
  }
  if (status === 'finished') {
    return `Echo Collector completado: ${total} ecos recogidos en ${formatTime(time)} segundos.`
  }
  return 'Echo Collector: una figura encapuchada ante una hilera de ecos brillantes en unas ruinas. Pulsa Jugar para empezar.'
}

export function GameCanvas({ canvasRef, state }: GameCanvasProps) {
  const playing = state.status === 'playing'

  return (
    <div className="relative h-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={describe(state)}
        tabIndex={playing ? 0 : -1}
        className={cn(
          'absolute inset-0 block size-full bg-ash-950 transition-opacity duration-700 select-none focus-visible:outline-none',
          state.ready ? 'opacity-100' : 'opacity-0',
          playing ? 'cursor-pointer touch-none' : 'touch-pan-y',
        )}
      />
      {state.status === 'finished' && (
        <p className="pointer-events-none absolute inset-x-0 top-4 text-center font-display text-xl text-bone-100 motion-safe:animate-reveal sm:text-2xl">
          Ecos reunidos en {formatTime(state.time)} s
        </p>
      )}
      {state.failed && (
        <p className="absolute inset-0 grid place-items-center text-sm text-ash-500">
          No se pudo cargar el minijuego.
        </p>
      )}
    </div>
  )
}
