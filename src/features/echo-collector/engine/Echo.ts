import { ECHO, WORLD } from './config'
import type { Rect } from './types'

/** Cristal flotante. Su X se guarda como fracción del rango jugable para sobrevivir al resize. */
export class Echo {
  x = 0
  readonly baseY: number
  readonly phase: number
  collected = false
  /** 0 → visible, 1 → desaparecido tras recogerlo. */
  fade = 0
  private readonly u: number

  constructor(u: number, high: boolean, phase: number) {
    this.u = u
    this.baseY = WORLD.groundY - (high ? ECHO.highHeight : ECHO.lowHeight)
    this.phase = phase
  }

  layout(minX: number, maxX: number): void {
    this.x = minX + (maxX - minX) * this.u
  }

  /** Desplazamiento senoidal de flotación. */
  floatOffset(time: number, amplitude: number): number {
    return Math.sin(time * ECHO.floatSpeed + this.phase) * amplitude
  }

  /** Intensidad del brillo entre 0 y 1. */
  pulse(time: number): number {
    return 0.5 + 0.5 * Math.sin(time * ECHO.pulseSpeed + this.phase * 1.7)
  }

  get hitbox(): Rect {
    const s = ECHO.hitSize
    return {
      x: this.x - s / 2,
      y: this.baseY - s / 2 - ECHO.floatAmplitude,
      w: s,
      h: s + ECHO.floatAmplitude * 2,
    }
  }

  get visible(): boolean {
    return this.fade < 1
  }

  update(dt: number): void {
    if (this.collected && this.fade < 1) this.fade = Math.min(1, this.fade + dt / ECHO.fadeDuration)
  }
}

export function createEchoes(): Echo[] {
  const { count, pattern } = ECHO
  return Array.from({ length: count }, (_, i) => {
    const u = 0.2 + (0.78 * i) / (count - 1)
    return new Echo(u, pattern[i] ?? false, i * 0.9)
  })
}
