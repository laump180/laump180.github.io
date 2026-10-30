import { Cape } from './Cape'
import { clamp } from './Collision'
import { BODY, PHYSICS, PLAYER, WORLD } from './config'
import type { Rect } from './types'

export interface PlayerControls {
  direction: number
  jump: boolean
}

/** Sucesos del último frame, para que el juego emita polvo. */
export interface PlayerEvents {
  stepped: boolean
  /** Se dio la vuelta este frame. */
  turned: boolean
  jumped: boolean
  /** 0 si no aterrizó; si no, intensidad del impacto (0.4–1). */
  landed: number
}

/** Personaje: posición = centro de los pies, eje Y hacia abajo. */
export class Player {
  x = 0
  y: number = WORLD.groundY
  vx = 0
  vy = 0
  facing: 1 | -1 = 1
  onGround = true
  /** Tiempo acumulado corriendo (ciclo de pasos). */
  runTime = 0
  /** Tiempo total (respiración en reposo). */
  time = 0
  /** 1 → recién aterrizado, decae a 0 (squash). */
  squash = 0
  /** 1 → recién despegado, decae a 0 (stretch). */
  takeoff = 0
  /** Tiempo en el aire del salto actual (animación aérea). */
  airTime = 0
  /** >0 mientras se agacha para saltar (segundos restantes). */
  windup = 0
  /** 1 → acaba de darse la vuelta, decae a 0 (frenada + brinco). */
  turnPop = 0
  readonly cape = new Cape()
  readonly events: PlayerEvents = { stepped: false, turned: false, jumped: false, landed: 0 }
  private coyote = 0
  private jumpBuffer = 0

  reset(x: number): void {
    this.x = x
    this.y = WORLD.groundY
    this.vx = 0
    this.vy = 0
    this.facing = 1
    this.turnPop = 0
    this.windup = 0
    this.airTime = 0
    this.onGround = true
    this.runTime = 0
    this.squash = 0
    this.takeoff = 0
    this.cape.reset()
    this.coyote = 0
    this.jumpBuffer = 0
  }

  update(dt: number, controls: PlayerControls, minX: number, maxX: number): void {
    this.events.stepped = false
    this.events.turned = false
    this.events.jumped = false
    this.events.landed = 0
    this.time += dt

    this.updateHorizontal(dt, controls.direction)
    this.updateVertical(dt, controls.jump)
    this.x = clamp(this.x + this.vx * dt, minX, maxX)

    this.squash = Math.max(0, this.squash - dt * 4)
    this.takeoff = Math.max(0, this.takeoff - dt * 5)
    this.turnPop = Math.max(0, this.turnPop - dt * BODY.turnRecovery)
    this.cape.update(dt, this.vx, this.vy, this.onGround, this.facing)
  }

  get hitbox(): Rect {
    return {
      x: this.x - PLAYER.hitWidth / 2,
      y: this.y - PLAYER.hitHeight,
      w: PLAYER.hitWidth,
      h: PLAYER.hitHeight,
    }
  }

  private updateHorizontal(dt: number, direction: number): void {
    const target = direction * PHYSICS.moveSpeed
    const step = PHYSICS.acceleration * dt
    this.vx += clamp(target - this.vx, -step, step)
    if (direction !== 0) {
      const facing = direction > 0 ? 1 : -1
      if (facing !== this.facing) {
        // El sprite se voltea en un frame; la frenada, la capa y el polvo disimulan el corte.
        this.facing = facing
        this.turnPop = 1
        this.events.turned = true
      }
    }

    if (this.onGround && Math.abs(this.vx) > 20) {
      // Un paso cada medio ciclo de la onda del bob.
      const before = Math.floor((this.runTime * BODY.stepFrequency) / Math.PI)
      this.runTime += dt
      const after = Math.floor((this.runTime * BODY.stepFrequency) / Math.PI)
      if (after !== before && Math.abs(this.vx) > PHYSICS.moveSpeed * 0.5) {
        this.events.stepped = true
      }
    }
  }

  private updateVertical(dt: number, jumpPressed: boolean): void {
    this.jumpBuffer = jumpPressed ? PHYSICS.jumpBuffer : Math.max(0, this.jumpBuffer - dt)
    this.coyote = this.onGround ? PHYSICS.coyoteTime : Math.max(0, this.coyote - dt)

    // Anticipación: primero se agacha un instante y luego despega.
    if (this.jumpBuffer > 0 && this.coyote > 0 && this.windup === 0 && this.onGround) {
      this.windup = PHYSICS.jumpWindup
      this.jumpBuffer = 0
    }
    if (this.windup > 0) {
      this.windup = Math.max(0, this.windup - dt)
      if (this.windup === 0) this.launch()
    } else if (this.jumpBuffer > 0 && this.coyote > 0) {
      // Salto coyote (ya en el aire): sin agachada.
      this.launch()
    }

    this.airTime = this.onGround ? 0 : this.airTime + dt
    this.vy += PHYSICS.gravity * dt
    this.y += this.vy * dt

    if (this.y >= WORLD.groundY) {
      if (!this.onGround) {
        const impact = clamp(this.vy / PHYSICS.jumpVelocity, 0.4, 1)
        this.squash = impact
        this.events.landed = impact
        this.cape.onLand(impact)
      }
      this.y = WORLD.groundY
      this.vy = 0
      this.onGround = true
    }
  }

  /** Progreso de la agachada previa: 0 → 1. */
  get crouch(): number {
    return this.windup > 0 ? 1 - this.windup / PHYSICS.jumpWindup : 0
  }

  private launch(): void {
    this.vy = -PHYSICS.jumpVelocity
    this.onGround = false
    this.jumpBuffer = 0
    this.coyote = 0
    this.takeoff = 1
    this.events.jumped = true
    this.cape.onJump()
  }
}
