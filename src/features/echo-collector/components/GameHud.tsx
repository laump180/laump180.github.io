import { Button } from '@/shared/ui'
import type { EchoCollectorState } from '../hooks/useEchoCollector'
import { formatCount, formatTime } from './format'

interface GameHudProps {
  state: EchoCollectorState
  onPlay: () => void
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <dt className="text-[10px] tracking-[0.18em] text-ash-300 uppercase">{label}</dt>
      <dd className="font-display text-[1.75rem] leading-none text-bone-100 tabular-nums">
        {value}
      </dd>
    </div>
  )
}

export function GameHud({ state, onPlay }: GameHudProps) {
  const { status, collected, total, time, best, ready } = state
  const label = status === 'finished' ? 'Jugar de nuevo' : 'Jugar'

  return (
    <div className="flex flex-col items-center gap-4 lg:items-stretch">
      <dl className="flex items-stretch justify-center gap-6">
        <Stat label="Ecos" value={`${formatCount(collected)} / ${formatCount(total)}`} />
        <span aria-hidden className="w-px bg-ash-800" />
        <Stat label="Tiempo" value={formatTime(time)} />
      </dl>
      <Button
        size="sm"
        arrow
        onClick={onPlay}
        disabled={!ready || status === 'playing'}
        className="w-full max-w-[200px] self-center px-5 whitespace-nowrap"
      >
        {status === 'playing' ? 'En juego' : label}
      </Button>
      <p className="h-4 text-center text-xs text-ash-500" aria-live="polite">
        {status === 'finished' && best !== null ? `Mejor tiempo · ${formatTime(best)} s` : ''}
      </p>
    </div>
  )
}
