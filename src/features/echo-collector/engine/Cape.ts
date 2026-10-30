import { clamp } from './Collision'
import { CAPE, PHYSICS } from './config'

/** Resorte amortiguado 1D: sub-amortiguado a propósito para que haya rebote. */
class Spring {
  value = 0
  private velocity = 0
  private readonly stiffness: number
  private readonly damping: number

  constructor(stiffness: number, damping: number) {
    this.stiffness = stiffness
    this.damping = damping
  }

  update(dt: number, target: number): void {
    const accel = this.stiffness * (target - this.value) - this.damping * this.velocity
    this.velocity += accel * dt
    this.value += this.velocity * dt
  }

  /** Impulso instantáneo (latigazo al girar, despegar…). */
  kick(amount: number): void {
    this.velocity += amount
  }

  reset(): void {
    this.value = 0
    this.velocity = 0
  }
}

/**
 * Estado de la capa. No hay sprite propio, así que se simula con señales
 * que el Renderer aplica deformando la mitad trasera de la imagen.
 */
export class Cape {
  /** Fase de la onda que recorre la tela. */
  phase = 0
  /** Intensidad de la onda, 0 (brisa) → 1 (carrera / aire). */
  flutter = 0
  /** + hacia atrás, − hacia delante (inercia al frenar). */
  private readonly stretchSpring = new Spring(CAPE.stretchStiffness, CAPE.stretchDamping)
  /** + abajo (se arrastra al subir), − arriba (flota al caer). */
  private readonly liftSpring = new Spring(CAPE.liftStiffness, CAPE.liftDamping)
  private lastFacing = 1

  get stretch(): number {
    return this.stretchSpring.value
  }

  get lift(): number {
    return this.liftSpring.value
  }

  reset(): void {
    this.phase = 0
    this.flutter = 0
    this.stretchSpring.reset()
    this.liftSpring.reset()
    this.lastFacing = 1
  }

  update(dt: number, vx: number, vy: number, onGround: boolean, facing: number): void {
    const speed = Math.min(1, Math.abs(vx) / PHYSICS.moveSpeed)
    const vertical = Math.min(1, Math.abs(vy) / PHYSICS.jumpVelocity)

    // Al girar, la capa queda "del lado equivocado" un instante: latigazo hacia delante.
    if (facing !== this.lastFacing) {
      this.stretchSpring.kick(-11)
      this.liftSpring.kick(-3)
      this.lastFacing = facing
    }

    const targetFlutter = onGround ? Math.min(1, speed + vertical * 0.8) : 1
    this.flutter += (targetFlutter - this.flutter) * Math.min(1, dt * 6)
    this.phase += dt * (CAPE.idleFrequency + CAPE.runFrequency * this.flutter)

    this.stretchSpring.update(dt, onGround ? speed : Math.max(speed, 0.65))
    this.liftSpring.update(dt, onGround ? 0 : clamp(-vy / PHYSICS.jumpVelocity, -1, 1))
  }

  /** Impulso al despegar: la tela da un tirón hacia abajo. */
  onJump(): void {
    this.liftSpring.kick(5)
  }

  /** Al aterrizar la tela sigue cayendo y rebota. */
  onLand(impact: number): void {
    this.liftSpring.kick(4 * impact)
  }
}
