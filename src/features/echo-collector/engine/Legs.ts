import { ARMS, BODY, LEGS, PHYSICS, PLAYER } from './config'
import type { Player } from './Player'

/** Ángulos en radianes desde la vertical; + hacia delante. La rodilla solo flexiona hacia atrás (−). */
interface LegAngles {
  thigh: number
  knee: number
}

export interface LegPose {
  back: LegAngles
  front: LegAngles
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

function mix(a: LegAngles, b: LegAngles, t: number): LegAngles {
  return { thigh: lerp(a.thigh, b.thigh, t), knee: lerp(a.knee, b.knee, t) }
}

const STAND: LegPose = { back: { thigh: -0.1, knee: -0.05 }, front: { thigh: 0.12, knee: -0.05 } }
const TUCK: LegPose = { back: { thigh: 0.45, knee: -1.3 }, front: { thigh: 0.95, knee: -1.5 } }
const FALL: LegPose = { back: { thigh: -0.3, knee: -0.5 }, front: { thigh: 0.35, knee: -0.25 } }

/** Ciclo de piernas a partir del estado físico (mismo reloj que el bob del cuerpo). */
export function legPose(player: Player): LegPose {
  if (!player.onGround) {
    const rising = Math.max(-1, Math.min(1, -player.vy / PHYSICS.jumpVelocity))
    const t = (rising + 1) / 2
    const base = { back: mix(FALL.back, TUCK.back, t), front: mix(FALL.front, TUCK.front, t) }
    // Pedaleo en el aire: las piernas siguen moviéndose, más amplio al caer.
    const phase = player.airTime * LEGS.airPedalSpeed
    const amp = LEGS.airPedal * (0.6 + 0.4 * (1 - t))
    const kick = (offset: number): LegAngles => ({
      thigh: Math.sin(phase + offset) * amp,
      knee: -Math.max(0, Math.cos(phase + offset)) * amp * 1.2,
    })
    const b = kick(Math.PI)
    const f = kick(0)
    return {
      back: { thigh: base.back.thigh + b.thigh, knee: base.back.knee + b.knee },
      front: { thigh: base.front.thigh + f.thigh, knee: base.front.knee + f.knee },
    }
  }

  const run = Math.min(1, Math.abs(player.vx) / PHYSICS.moveSpeed)
  // Medio ciclo por paso: el bob tiene un pico en cada paso, la zancada completa dura 2π.
  const phase = player.runTime * BODY.stepFrequency
  const swing = Math.sin(phase) * LEGS.stride * run
  const liftA = Math.max(0, Math.cos(phase)) * LEGS.kneeLift * run
  const liftB = Math.max(0, -Math.cos(phase)) * LEGS.kneeLift * run

  const running: LegPose = {
    back: { thigh: -swing, knee: -liftB },
    front: { thigh: swing, knee: -liftA },
  }
  const pose: LegPose = {
    back: mix(STAND.back, running.back, run),
    front: mix(STAND.front, running.front, run),
  }

  // Aterrizaje: ambas rodillas se flexionan.
  const s = Math.max(player.squash, player.crouch)
  pose.back = { thigh: pose.back.thigh + 0.45 * s, knee: pose.back.knee - 1.1 * s }
  pose.front = { thigh: pose.front.thigh + 0.6 * s, knee: pose.front.knee - 1.2 * s }
  return pose
}

/** Convierte coordenadas del sprite (px de la imagen) a coordenadas locales del personaje. */
export function local(srcX: number, srcY: number): { x: number; y: number } {
  return {
    x: -PLAYER.drawWidth / 2 + (srcX / PLAYER.sourceWidth) * PLAYER.drawWidth,
    y: -PLAYER.drawHeight + PLAYER.footOffset + (srcY / PLAYER.sourceHeight) * PLAYER.drawHeight,
  }
}

function drawLeg(
  ctx: CanvasRenderingContext2D,
  hipSrc: { x: number; y: number },
  angles: LegAngles,
  shade: string,
): void {
  const hip = local(hipSrc.x, hipSrc.y)
  const kneeX = hip.x + Math.sin(angles.thigh) * LEGS.thighLength
  const kneeY = hip.y + Math.cos(angles.thigh) * LEGS.thighLength
  const shinAngle = angles.thigh + angles.knee
  const ankleX = kneeX + Math.sin(shinAngle) * LEGS.shinLength
  const ankleY = kneeY + Math.cos(shinAngle) * LEGS.shinLength
  // La bota apunta hacia delante, perpendicular a la espinilla.
  const toeX = ankleX + Math.cos(shinAngle) * LEGS.bootLength
  const toeY = ankleY - Math.sin(shinAngle) * LEGS.bootLength

  ctx.strokeStyle = shade
  ctx.lineWidth = LEGS.thighWidth
  ctx.beginPath()
  ctx.moveTo(hip.x, hip.y)
  ctx.lineTo(kneeX, kneeY)
  ctx.stroke()

  ctx.lineWidth = LEGS.shinWidth
  ctx.beginPath()
  ctx.moveTo(kneeX, kneeY)
  ctx.lineTo(ankleX, ankleY)
  ctx.stroke()

  ctx.strokeStyle = LEGS.bootColor
  ctx.lineWidth = LEGS.bootWidth
  ctx.beginPath()
  ctx.moveTo(ankleX - Math.cos(shinAngle) * 0.8, ankleY + Math.sin(shinAngle) * 0.8)
  ctx.lineTo(toeX, toeY)
  ctx.stroke()
}

/** Dibuja las dos piernas en el sistema local del personaje (antes que el sprite: quedan bajo el abrigo). */
export function drawLegs(ctx: CanvasRenderingContext2D, pose: LegPose): void {
  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  drawLeg(ctx, LEGS.backHip, pose.back, LEGS.backColor)
  drawLeg(ctx, LEGS.frontHip, pose.front, LEGS.frontColor)
  ctx.restore()
}

/**
 * Recorta del sprite las zonas donde estaban las piernas y el brazo originales (y una mancha suelta),
 * dejando intactos la capa y el resto del cuerpo.
 */
export function clipOriginalLimbs(ctx: CanvasRenderingContext2D): void {
  const topLeft = local(LEGS.hideRect.x0, LEGS.hideRect.y0)
  const bottomRight = local(LEGS.hideRect.x1, PLAYER.sourceHeight)
  const outer = local(0, 0)
  const outerEnd = local(PLAYER.sourceWidth, PLAYER.sourceHeight)
  const m = 40
  ctx.beginPath()
  ctx.rect(outer.x - m, outer.y - m, outerEnd.x - outer.x + m * 2, outerEnd.y - outer.y + m * 2)
  ctx.rect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y + m)
  // Brazo delantero original (se dibuja uno procedural encima).
  const armA = local(ARMS.hideRect.x0, ARMS.hideRect.y0)
  const armB = local(ARMS.hideRect.x1, ARMS.hideRect.y1)
  ctx.rect(armA.x, armA.y, armB.x - armA.x, armB.y - armA.y)
  ctx.clip('evenodd')
}
