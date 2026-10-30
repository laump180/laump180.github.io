import { ARMS, BODY, PHYSICS } from './config'
import { local } from './Legs'
import type { Player } from './Player'

/** Ángulos en radianes desde la vertical; + hacia delante (y arriba si pasa de π/2). */
interface ArmAngles {
  shoulder: number
  /** Flexión del codo, se suma al hombro para el antebrazo. */
  elbow: number
}

export interface ArmPose {
  back: ArmAngles
  front: ArmAngles
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

function mix(a: ArmAngles, b: ArmAngles, t: number): ArmAngles {
  return { shoulder: lerp(a.shoulder, b.shoulder, t), elbow: lerp(a.elbow, b.elbow, t) }
}

const REST: ArmPose = {
  back: { shoulder: 0.35, elbow: 0.35 },
  front: { shoulder: 0.6, elbow: 0.3 },
}
const WINDUP: ArmPose = {
  back: { shoulder: -0.9, elbow: 0.3 },
  front: { shoulder: -0.6, elbow: 0.4 },
}
/** Subiendo: brazos hacia delante y arriba (sin tapar la cara). */
const RISE: ArmPose = {
  back: { shoulder: 2.0, elbow: 0.3 },
  front: { shoulder: 1.75, elbow: 0.25 },
}
/** Cayendo: brazos abiertos para equilibrarse. */
const FALL: ArmPose = { back: { shoulder: 1.9, elbow: -0.4 }, front: { shoulder: 1.4, elbow: 0.6 } }

/** Pose de los brazos a partir del estado físico (mismo reloj que piernas y cuerpo). */
export function armPose(player: Player, reducedMotion: boolean): ArmPose {
  const flail = reducedMotion ? 0 : 1

  if (!player.onGround) {
    const rising = Math.max(-1, Math.min(1, -player.vy / PHYSICS.jumpVelocity))
    const base = {
      back: mix(FALL.back, RISE.back, (rising + 1) / 2),
      front: mix(FALL.front, RISE.front, (rising + 1) / 2),
    }
    // Aleteo en el aire, desfasado entre brazos.
    const phase = player.airTime * ARMS.airFlapSpeed
    const flap = ARMS.airFlap * flail
    return {
      back: { shoulder: base.back.shoulder + Math.sin(phase + 1.3) * flap, elbow: base.back.elbow },
      front: {
        shoulder: base.front.shoulder + Math.sin(phase) * flap,
        elbow: base.front.elbow + Math.cos(phase) * flap * 0.5,
      },
    }
  }

  const run = Math.min(1, Math.abs(player.vx) / PHYSICS.moveSpeed)
  const phase = player.runTime * BODY.stepFrequency
  // Al correr cada brazo va contrario a su pierna.
  const swing = Math.sin(phase) * ARMS.runSwing * run
  const breath = Math.sin(player.time * BODY.breathSpeed) * 0.05 * flail
  const pose: ArmPose = {
    back: { shoulder: REST.back.shoulder + swing + breath, elbow: lerp(REST.back.elbow, 1.1, run) },
    front: {
      shoulder: REST.front.shoulder - swing + breath,
      elbow: lerp(REST.front.elbow, 1.1, run),
    },
  }

  // Agachada previa al salto: brazos atrás. Aterrizaje: brazos abajo y adelante.
  const c = player.crouch
  const s = player.squash
  return {
    back: mix(mix(pose.back, WINDUP.back, c), { shoulder: 0.9, elbow: 0.5 }, s * 0.6),
    front: mix(mix(pose.front, WINDUP.front, c), { shoulder: 1.1, elbow: 0.4 }, s * 0.6),
  }
}

/** Dibuja un brazo en el sistema local del personaje. */
export function drawArm(
  ctx: CanvasRenderingContext2D,
  angles: ArmAngles,
  which: 'back' | 'front',
): void {
  const src = which === 'front' ? ARMS.frontShoulder : ARMS.backShoulder
  const shoulder = local(src.x, src.y)
  const elbowX = shoulder.x + Math.sin(angles.shoulder) * ARMS.upperLength
  const elbowY = shoulder.y + Math.cos(angles.shoulder) * ARMS.upperLength
  const fore = angles.shoulder + angles.elbow
  const handX = elbowX + Math.sin(fore) * ARMS.foreLength
  const handY = elbowY + Math.cos(fore) * ARMS.foreLength

  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const front = which === 'front'
  const sleeve = (): void => {
    ctx.beginPath()
    ctx.moveTo(shoulder.x, shoulder.y)
    ctx.lineTo(elbowX, elbowY)
    ctx.lineTo(handX, handY)
    ctx.stroke()
  }
  // Borde claro debajo y manga oscura encima.
  ctx.strokeStyle = front ? ARMS.rimColor : ARMS.backRimColor
  ctx.lineWidth = ARMS.width + ARMS.rimWidth
  sleeve()
  ctx.strokeStyle = front ? ARMS.frontColor : ARMS.backColor
  ctx.lineWidth = ARMS.width
  sleeve()

  ctx.fillStyle = front ? ARMS.handColor : ARMS.backHandColor
  ctx.beginPath()
  ctx.arc(handX, handY, ARMS.handRadius, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}
