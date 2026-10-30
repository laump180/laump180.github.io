import { PHYSICS } from './config'

type FrameHandler = (dt: number, time: number) => void

/** Bucle con requestAnimationFrame y delta time acotado. */
export class GameLoop {
  private frameId: number | null = null
  private lastTime = 0
  private elapsed = 0

  private readonly onFrame: FrameHandler

  constructor(onFrame: FrameHandler) {
    this.onFrame = onFrame
  }

  get running(): boolean {
    return this.frameId !== null
  }

  start(): void {
    if (this.running) return
    this.lastTime = performance.now()
    this.frameId = requestAnimationFrame(this.tick)
  }

  stop(): void {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId)
    this.frameId = null
  }

  private readonly tick = (now: number): void => {
    // Acotar dt evita saltos enormes tras un tirón o una pestaña en segundo plano.
    const dt = Math.min((now - this.lastTime) / 1000, PHYSICS.maxDelta)
    this.lastTime = now
    this.elapsed += dt
    this.onFrame(dt, this.elapsed)
    this.frameId = requestAnimationFrame(this.tick)
  }
}
