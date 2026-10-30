import { useCallback, useEffect, useRef, useState } from 'react'
import { readStorage, writeStorage } from '@/shared/lib/storage'

const SRC = `${import.meta.env.BASE_URL}audio/ambient-loop.mp3`
const VOLUME_KEY = 'ambient-audio:volume'
const ENABLED_KEY = 'ambient-audio:enabled'
const DEFAULT_VOLUME = 0.35
const FADE_MS = 900

function readVolume(): number {
  const value = Number(readStorage(VOLUME_KEY))
  return Number.isFinite(value) && value >= 0 && value <= 1 && readStorage(VOLUME_KEY) !== null
    ? value
    : DEFAULT_VOLUME
}

/**
 * Música de fondo en bucle, activada por defecto al volumen guardado (35 % la primera vez).
 * Los navegadores pueden bloquear el audio hasta que la persona interactúa; en ese caso
 * empieza con el primer clic, toque o tecla. Si la persona la pausa, se respeta en adelante.
 */
export function useAmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolumeState] = useState(readVolume)
  const volumeRef = useRef(volume)

  const getAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      const audio = new Audio(SRC)
      audio.loop = true
      audio.preload = 'none'
      audio.volume = 0
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current)
    const from = audio.volume
    const start = performance.now()
    const tick = (now: number) => {
      // El primer frame puede traer una marca de tiempo anterior a `start`: se acota.
      const t = Math.min(1, Math.max(0, (now - start) / FADE_MS))
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * t))
      if (t < 1) fadeRef.current = requestAnimationFrame(tick)
      else {
        fadeRef.current = null
        onDone?.()
      }
    }
    fadeRef.current = requestAnimationFrame(tick)
  }, [])

  /** Devuelve true si empezó a sonar. */
  const play = useCallback(async (): Promise<boolean> => {
    const audio = getAudio()
    if (!audio.paused && fadeRef.current === null) return true
    try {
      await audio.play()
      setPlaying(true)
      writeStorage(ENABLED_KEY, '1')
      fadeTo(volumeRef.current)
      return true
    } catch {
      // Reproducción bloqueada o archivo no disponible: queda en pausa.
      setPlaying(false)
      return false
    }
  }, [fadeTo, getAudio])

  const pause = useCallback(() => {
    setPlaying(false)
    writeStorage(ENABLED_KEY, '0')
    fadeTo(0, () => audioRef.current?.pause())
  }, [fadeTo])

  const toggle = useCallback(() => (playing ? pause() : void play()), [pause, play, playing])

  const setVolume = useCallback((value: number) => {
    volumeRef.current = value
    setVolumeState(value)
    writeStorage(VOLUME_KEY, value.toFixed(2))
    const audio = audioRef.current
    if (audio && !audio.paused && fadeRef.current === null) audio.volume = value
  }, [])

  // Inicio automático: intenta sonar al cargar; si el navegador lo bloquea,
  // arranca con la primera interacción. Solo se omite si la persona la pausó antes.
  useEffect(() => {
    if (readStorage(ENABLED_KEY) === '0') return
    const events = ['pointerdown', 'keydown', 'touchend'] as const
    let started = false

    const detach = () => events.forEach((e) => window.removeEventListener(e, onInteract))
    const attempt = async () => {
      if (started) return
      started = await play()
      if (started) detach()
    }
    function onInteract(event: Event) {
      // El propio control ya gestiona su clic (evita reproducir y pausar a la vez).
      if (event.target instanceof Element && event.target.closest('[data-ambient-control]')) {
        detach()
        return
      }
      void attempt()
    }

    events.forEach((e) => window.addEventListener(e, onInteract))
    void attempt()
    return detach
  }, [play])

  // Silencia al cambiar de pestaña y retoma al volver.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio || !playing) return
      if (document.hidden) audio.pause()
      else void audio.play().catch(() => setPlaying(false))
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [playing])

  useEffect(
    () => () => {
      if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current)
      audioRef.current?.pause()
    },
    [],
  )

  return { playing, volume, toggle, setVolume }
}
