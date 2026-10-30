import { BODY, PHYSICS } from './config'
import type { Player } from './Player'

export interface Pose {
  offsetY: number
  tilt: number
  scaleX: number
  scaleY: number
}

/**
 * Animación procedural del cuerpo a partir del estado físico:
 * rebote y aplastado por paso, inclinación al correr y en el aire,
 * respiración en reposo, estirón al despegar, aplastado al aterrizar y giro animado.
 */
export function bodyPose(player: Player, reducedMotion: boolean): Pose {
  const speed = player.vx / PHYSICS.moveSpeed
  const run = player.onGround ? Math.abs(speed) : 0
  const step = player.runTime * BODY.stepFrequency
  const calm = reducedMotion ? 0 : 1

  const bob = -Math.abs(Math.sin(step)) * BODY.runBob * run
  const stepSquash = Math.cos(step * 2) * BODY.stepSquash * run
  const breath = Math.sin(player.time * BODY.breathSpeed) * BODY.breathAmount * (1 - run) * calm

  const rising = Math.max(-1, Math.min(1, player.vy / PHYSICS.jumpVelocity))
  const airLean = player.onGround ? 0 : rising * BODY.airLean * player.facing

  // Giro: aplastado + brinco + inclinación hacia atrás (contra la nueva dirección).
  const pop = player.turnPop
  const turnEase = Math.sin(pop * Math.PI) // 0 → 1 → 0
  const turnSquash = pop * BODY.turnSquash

  // Aire: balanceo continuo, inclinación hacia delante en el punto alto, estirón según la velocidad.
  const air = player.onGround ? 0 : 1
  const apex = air * (1 - Math.abs(rising))
  const wobble = air * Math.sin(player.airTime * BODY.airWobbleSpeed) * BODY.airWobble
  const airStretch = air * Math.abs(rising) * BODY.airStretch

  const tilt =
    speed * BODY.runLean +
    airLean +
    wobble +
    apex * BODY.apexLean * player.facing -
    player.facing * BODY.turnLean * pop
  const squash = player.squash * BODY.landSquash + player.crouch * BODY.windupSquash
  const stretch = player.takeoff * BODY.takeoffStretch + airStretch - apex * 0.04

  return {
    offsetY: bob - turnEase * BODY.turnHop,
    tilt,
    scaleX:
      player.facing *
      (1 + turnSquash * 0.8 + squash * 0.75 - stretch * 0.6 - stepSquash * 0.5 - breath * 0.4),
    scaleY: 1 - turnSquash - squash + stretch + stepSquash + breath,
  }
}
