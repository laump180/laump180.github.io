import { ECHO, PLAYER, WORLD } from './config'
import { bodyPose } from './BodyPose'
import { drawWarpedSprite } from './CapeWarp'
import { armPose, drawArm } from './Arms'
import { clipOriginalLimbs, drawLegs, legPose } from './Legs'
import type { Echo } from './Echo'
import type { ParticleSystem } from './Particles'
import type { Player } from './Player'
import type { GameAssets, Viewport } from './types'

const GLOW_RGB = '243, 230, 211'
const DUST_RGB = '168, 156, 140'

export interface Scene {
  viewport: Viewport
  player: Player
  echoes: readonly Echo[]
  particles: ParticleSystem
  time: number
  reducedMotion: boolean
}

/** Dibuja la escena en un contexto 2D. No conoce el estado del juego ni React. */
export class Renderer {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly assets: GameAssets

  constructor(canvas: HTMLCanvasElement, assets: GameAssets) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D no disponible')
    this.canvas = canvas
    this.ctx = ctx
    this.assets = assets
  }

  resize({ cssWidth, cssHeight, dpr }: Viewport): void {
    this.canvas.width = Math.max(1, Math.round(cssWidth * dpr))
    this.canvas.height = Math.max(1, Math.round(cssHeight * dpr))
  }

  draw(scene: Scene): void {
    const { ctx } = this
    const { scale, dpr, offsetX, offsetY } = scene.viewport
    const k = scale * dpr

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.setTransform(k, 0, 0, k, -offsetX * k, -offsetY * k)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(this.assets.background, 0, 0, WORLD.width, WORLD.height)
    for (const echo of scene.echoes) if (echo.visible) this.drawEcho(echo, scene)
    this.drawParticles(scene.particles)
    this.drawPlayer(scene.player, scene.reducedMotion)
  }

  private drawEcho(echo: Echo, { time, reducedMotion }: Scene): void {
    const { ctx } = this
    const amplitude = reducedMotion ? 0 : ECHO.floatAmplitude
    const pulse = reducedMotion ? 0.6 : echo.pulse(time)
    const y = echo.baseY + echo.floatOffset(time, amplitude)
    const alpha = 1 - echo.fade
    const grow = 1 + echo.fade * 0.7

    // Halo aditivo pulsante
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    const radius = 26 * (0.85 + 0.35 * pulse) * grow
    const glow = ctx.createRadialGradient(echo.x, y, 0, echo.x, y, radius)
    glow.addColorStop(0, `rgba(${GLOW_RGB}, ${0.32 * alpha * (0.55 + 0.45 * pulse)})`)
    glow.addColorStop(1, `rgba(${GLOW_RGB}, 0)`)
    ctx.fillStyle = glow
    ctx.fillRect(echo.x - radius, y - radius, radius * 2, radius * 2)
    ctx.restore()

    ctx.save()
    ctx.globalAlpha = alpha
    const w = ECHO.drawWidth * grow
    const h = ECHO.drawHeight * grow
    ctx.drawImage(this.assets.echo, echo.x - w / 2, y - h / 2, w, h)
    ctx.restore()
  }

  private drawParticles(particles: ParticleSystem): void {
    const { ctx } = this
    ctx.save()
    for (const p of particles.items) {
      if (p.kind !== 'dust') continue
      ctx.fillStyle = `rgba(${DUST_RGB}, ${0.5 * Math.max(0, p.life / p.maxLife)})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'lighter'
    for (const p of particles.items) {
      if (p.kind !== 'glow') continue
      ctx.fillStyle = `rgba(${GLOW_RGB}, ${Math.max(0, p.life / p.maxLife)})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }

  private drawShadow(player: Player): void {
    const { ctx } = this
    const shadow = Math.max(0.15, 1 - (WORLD.groundY - player.y) / 220)
    ctx.save()
    ctx.fillStyle = `rgba(0, 0, 0, ${0.45 * shadow})`
    ctx.beginPath()
    ctx.ellipse(player.x, WORLD.groundY + 1, 26 * shadow, 4 * shadow, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  private drawPlayer(player: Player, reducedMotion: boolean): void {
    const { ctx } = this
    this.drawShadow(player)

    const pose = bodyPose(player, reducedMotion)
    ctx.save()
    ctx.translate(player.x, player.y + pose.offsetY)
    ctx.rotate(pose.tilt)
    ctx.scale(pose.scaleX, pose.scaleY)
    const arms = armPose(player, reducedMotion)
    drawArm(ctx, arms.back, 'back')
    drawLegs(ctx, legPose(player))
    ctx.save()
    clipOriginalLimbs(ctx)
    drawWarpedSprite(
      ctx,
      this.assets.player,
      -PLAYER.drawWidth / 2,
      -PLAYER.drawHeight + PLAYER.footOffset,
      PLAYER.drawWidth,
      PLAYER.drawHeight,
      player.cape,
      { reducedMotion },
    )
    ctx.restore()
    drawArm(ctx, arms.front, 'front')
    ctx.restore()
  }
}
