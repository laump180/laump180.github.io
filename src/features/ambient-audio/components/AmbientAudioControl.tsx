import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { useAmbientAudio } from '../hooks/useAmbientAudio'

/** Ecualizador decorativo: tres barras que laten mientras suena (quietas con movimiento reducido). */
function Bars({ active }: { active: boolean }) {
  return (
    <span aria-hidden className="flex h-3 items-end gap-[2px]">
      {[0, 180, 360].map((delay) => (
        <span
          key={delay}
          className={cn(
            'w-[2px] origin-bottom bg-bone-100/70',
            active ? 'h-3 animate-eq motion-reduce:animate-none' : 'h-1',
          )}
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}

/** Control flotante de la música de fondo: reproducir/pausar y volumen. */
export function AmbientAudioControl() {
  const { playing, volume, toggle, setVolume } = useAmbientAudio()
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  return (
    <div
      role="group"
      data-ambient-control
      aria-label="Música de fondo"
      className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 border border-ash-800 bg-ash-950/90 py-2 pr-4 pl-2 text-ash-300 shadow-[0_8px_30px_rgb(0_0_0/0.5)] backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        className="grid size-8 place-items-center border border-wine-500/60 bg-wine-900 text-bone-100 transition-colors hover:border-wine-500"
      >
        {playing ? (
          <Pause className="size-3.5" strokeWidth={1.5} />
        ) : (
          <Play className="size-3.5 translate-x-px" strokeWidth={1.5} />
        )}
      </button>
      <Bars active={playing} />
      <button
        type="button"
        onClick={() => setVolume(volume === 0 ? 0.35 : 0)}
        aria-label={volume === 0 ? 'Activar sonido' : 'Silenciar'}
        className="text-ash-300 transition-colors hover:text-bone-100"
      >
        <VolumeIcon className="size-4" strokeWidth={1.5} />
      </button>
      <label className="sr-only" htmlFor="ambient-volume">
        Volumen de la música
      </label>
      <input
        id="ambient-volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        aria-valuetext={`${Math.round(volume * 100)} %`}
        className="h-1 w-20 cursor-pointer accent-wine-500 sm:w-24"
      />
    </div>
  )
}
