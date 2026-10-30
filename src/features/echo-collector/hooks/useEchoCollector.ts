import { useCallback, useEffect, useRef, useState } from 'react'
import gameBg from '@/shared/assets/images/game/game-bg.webp'
import echoCrystal from '@/shared/assets/sprites/echo-crystal.webp'
import hoodedRunner from '@/shared/assets/sprites/hooded-runner.webp'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import { readStorage, writeStorage } from '@/shared/lib/storage'
import {
  BEST_TIME_KEY,
  ECHO,
  EchoCollectorGame,
  loadGameAssets,
  type GameCallbacks,
  type GameStatus,
} from '../engine'

const ASSET_URLS = { background: gameBg, player: hoodedRunner, echo: echoCrystal }

export interface EchoCollectorState {
  status: GameStatus
  collected: number
  total: number
  /** Segundos; se actualiza a ~10 Hz, no por frame. */
  time: number
  best: number | null
  ready: boolean
  failed: boolean
}

function readBest(): number | null {
  const value = Number(readStorage(BEST_TIME_KEY))
  return Number.isFinite(value) && value > 0 ? value : null
}

const initialState = (): EchoCollectorState => ({
  status: 'idle',
  collected: 0,
  total: ECHO.count,
  time: 0,
  best: readBest(),
  ready: false,
  failed: false,
})

/** Puente entre el engine (TS puro) y React: monta el juego y expone el estado del HUD. */
export function useEchoCollector() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<EchoCollectorGame | null>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const callbacks: GameCallbacks = {
      onEchoCollected: (collected) => setState((s) => ({ ...s, collected })),
      onTimeTick: (time) => setState((s) => ({ ...s, time })),
      onFinish: (time) =>
        setState((s) => {
          const best = s.best === null || time < s.best ? time : s.best
          if (best === time) writeStorage(BEST_TIME_KEY, time.toFixed(2))
          return { ...s, status: 'finished', time, best }
        }),
    }

    let cancelled = false
    let teardown = (): void => {}

    loadGameAssets(ASSET_URLS)
      .then((assets) => {
        if (cancelled) return
        const game = new EchoCollectorGame(canvas, assets, callbacks, { reducedMotion })
        gameRef.current = game

        const observer = new ResizeObserver(([entry]) => {
          if (!entry) return
          const { width, height } = entry.contentRect
          game.resize(width, height, window.devicePixelRatio || 1)
        })
        observer.observe(canvas)

        const onVisibility = (): void => (document.hidden ? game.pause() : game.resume())
        document.addEventListener('visibilitychange', onVisibility)

        teardown = () => {
          observer.disconnect()
          document.removeEventListener('visibilitychange', onVisibility)
          game.destroy()
          gameRef.current = null
        }
        setState((s) => ({ ...s, status: 'idle', collected: 0, time: 0, ready: true }))
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, failed: true }))
      })

    return () => {
      cancelled = true
      teardown()
    }
  }, [reducedMotion])

  const play = useCallback(() => {
    const game = gameRef.current
    if (!game) return
    game.start()
    setState((s) => ({ ...s, status: 'playing', collected: 0, time: 0 }))
    canvasRef.current?.focus({ preventScroll: true })
  }, [])

  return { canvasRef, state, play }
}
