import { DUST, PARTICLES } from './config'

export type ParticleKind = 'glow' | 'dust'

export interface Particle {
  kind: ParticleKind
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  gravity: number
}

/** Destellos al recoger un eco y polvo en los pies del personaje. */
export class ParticleSystem {
  readonly items: Particle[] = []

  burst(x: number, y: number, amount: number = PARTICLES.perBurst): void {
    for (let i = 0; i < amount; i++) {
      const angle = (Math.PI * 2 * i) / amount + Math.random() * 0.4
      const speed = PARTICLES.speed * (0.4 + Math.random() * 0.8)
      const life = PARTICLES.life * (0.7 + Math.random() * 0.3)
      this.items.push({
        kind: 'glow',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 40,
        life,
        maxLife: life,
        size: 1 + Math.random() * 2,
        gravity: 60,
      })
    }
  }

  /**
   * Nubecillas de polvo a ras de suelo.
   * @param direction −1/1 empuja el polvo hacia ese lado; 0 lo abre a ambos lados.
   */
  dust(x: number, y: number, amount: number, direction: number, strength = 1): void {
    for (let i = 0; i < amount; i++) {
      const side = direction === 0 ? (i % 2 === 0 ? -1 : 1) : direction
      const life = DUST.life * (0.6 + Math.random() * 0.4)
      this.items.push({
        kind: 'dust',
        x: x + (Math.random() - 0.5) * 10,
        y: y - Math.random() * 3,
        vx: side * (30 + Math.random() * 70) * strength,
        vy: -(15 + Math.random() * 40) * (0.6 + strength * 0.4),
        life,
        maxLife: life,
        size: (2.5 + Math.random() * 3) * (0.8 + strength * 0.25),
        gravity: -20,
      })
    }
  }

  update(dt: number): void {
    const damping = Math.exp(-PARTICLES.drag * dt)
    for (const p of this.items) {
      p.vx *= damping
      p.vy = p.vy * damping + p.gravity * dt
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.life -= dt
      if (p.kind === 'dust') p.size += dt * 9
    }
    for (let i = this.items.length - 1; i >= 0; i--) {
      if ((this.items[i]?.life ?? 0) <= 0) this.items.splice(i, 1)
    }
  }

  clear(): void {
    this.items.length = 0
  }
}
