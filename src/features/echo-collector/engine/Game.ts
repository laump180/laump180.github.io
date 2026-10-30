import { intersects } from './Collision'
import { DUST, ECHO, HUD_TICK_SECONDS, WORLD } from './config'
import { createEchoes, type Echo } from './Echo'
import { GameLoop } from './GameLoop'
import { Input } from './Input'
import { ParticleSystem } from './Particles'
import { Player } from './Player'
import { Renderer } from './Renderer'
import { computeViewport } from './Viewport'
import type { GameAssets, GameCallbacks, GameOptions, GameStatus, Viewport } from './types'

const START_OFFSET = 30

/** Orquesta entidades, entrada, bucle y render. Hacia fuera solo habla mediante callbacks. */
export class EchoCollectorGame {
  status: GameStatus = 'idle'
  private readonly loop = new GameLoop((dt, time) => this.frame(dt, time))
  private readonly input: Input
  private readonly renderer: Renderer
  private readonly callbacks: GameCallbacks
  private readonly options: GameOptions
  private readonly player = new Player()
  private readonly particles = new ParticleSystem()
  private echoes: Echo[] = createEchoes()
  private viewport: Viewport = computeViewport(1, 1, 1)
  private time = 0
  private elapsed = 0
  private sinceTick = 0
  private collected = 0
  private paused = false

  constructor(
    canvas: HTMLCanvasElement,
    assets: GameAssets,
    callbacks: GameCallbacks,
    options: GameOptions,
  ) {
    this.input = new Input(canvas)
    this.renderer = new Renderer(canvas, assets)
    this.callbacks = callbacks
    this.options = options
  }

  get total(): number {
    return ECHO.count
  }

  resize(cssWidth: number, cssHeight: number, dpr: number): void {
    this.viewport = computeViewport(cssWidth, cssHeight, dpr)
    this.renderer.resize(this.viewport)
    this.layoutEchoes()
    if (this.status === 'idle') this.player.reset(this.viewport.minX + START_OFFSET)
    this.render()
  }

  start(): void {
    this.echoes = createEchoes()
    this.layoutEchoes()
    this.player.reset(this.viewport.minX + START_OFFSET)
    this.particles.clear()
    this.input.reset()
    this.input.enabled = true
    this.elapsed = 0
    this.sinceTick = 0
    this.collected = 0
    this.status = 'playing'
    this.callbacks.onTimeTick(0)
    if (!this.paused) this.loop.start()
  }

  pause(): void {
    this.paused = true
    this.loop.stop()
    this.input.reset()
  }

  resume(): void {
    this.paused = false
    if (this.status === 'playing' || (this.status === 'finished' && !this.settled())) {
      this.loop.start()
    }
  }

  destroy(): void {
    this.loop.stop()
    this.input.destroy()
  }

  private layoutEchoes(): void {
    for (const echo of this.echoes) echo.layout(this.viewport.minX, this.viewport.maxX)
  }

  private frame(dt: number, time: number): void {
    this.time = time
    const playing = this.status === 'playing'
    const controls = playing
      ? { direction: this.input.direction, jump: this.input.consumeJump() }
      : { direction: 0, jump: false }

    this.player.update(dt, controls, this.viewport.minX, this.viewport.maxX)
    this.emitDust()
    for (const echo of this.echoes) echo.update(dt)
    this.particles.update(dt)

    if (playing) {
      this.tickClock(dt)
      this.collectEchoes()
    }
    this.render()
    if (this.status === 'finished' && this.settled()) this.loop.stop()
  }

  private emitDust(): void {
    const { events, x, facing } = this.player
    const scale = this.options.reducedMotion ? 0.5 : 1
    if (events.stepped) {
      this.particles.dust(x - facing * 8, WORLD.groundY, Math.ceil(DUST.perStep * scale), -facing)
    }
    if (events.turned && this.player.onGround) {
      this.particles.dust(x + facing * 6, WORLD.groundY, Math.ceil(DUST.perTurn * scale), -facing)
    }
    if (events.jumped && this.player.vy < 0 && this.player.y > WORLD.groundY - 4) {
      // Impulso: polvo hacia los lados y hacia atrás.
      this.particles.dust(x, WORLD.groundY, Math.ceil(DUST.perJump * scale), 0, 1.3)
      this.particles.dust(x - facing * 6, WORLD.groundY, Math.ceil(4 * scale), -facing, 1.6)
    }
    if (events.landed > 0) {
      const amount = Math.ceil(DUST.perLanding * events.landed * scale)
      // Caída: anillo de polvo proporcional al impacto.
      this.particles.dust(x, WORLD.groundY, amount, 0, 1 + events.landed * 1.2)
    }
  }

  private collectEchoes(): void {
    const hitbox = this.player.hitbox
    for (const echo of this.echoes) {
      if (echo.collected || !intersects(hitbox, echo.hitbox)) continue
      echo.collected = true
      this.collected += 1
      this.particles.burst(echo.x, echo.baseY, this.options.reducedMotion ? 6 : undefined)
      this.callbacks.onEchoCollected(this.collected, this.total)
    }
    if (this.collected === this.total) this.finish()
  }

  private tickClock(dt: number): void {
    this.elapsed += dt
    this.sinceTick += dt
    if (this.sinceTick >= HUD_TICK_SECONDS) {
      this.sinceTick = 0
      this.callbacks.onTimeTick(this.elapsed)
    }
  }

  private finish(): void {
    this.status = 'finished'
    this.input.enabled = false
    this.input.reset()
    this.callbacks.onTimeTick(this.elapsed)
    this.callbacks.onFinish(this.elapsed)
  }

  /** Sin partículas, fades ni movimiento pendientes. */
  private settled(): boolean {
    const p = this.player
    return (
      this.particles.items.length === 0 &&
      p.onGround &&
      Math.abs(p.vx) < 1 &&
      p.squash === 0 &&
      this.echoes.every((e) => !e.collected || !e.visible)
    )
  }

  private render(): void {
    this.renderer.draw({
      viewport: this.viewport,
      player: this.player,
      echoes: this.echoes,
      particles: this.particles,
      time: this.time,
      reducedMotion: this.options.reducedMotion,
    })
  }
}
