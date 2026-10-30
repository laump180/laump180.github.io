/** Todas las magnitudes están en unidades de mundo (= px de game-bg) y segundos. */
export const WORLD = {
  width: 1900,
  height: 328,
  /** Altura del borde superior de las piedras del suelo. */
  groundY: 282,
  /** Zona transitable (fuera quedan plantas y columnas del fondo). */
  walkMinX: 150,
  walkMaxX: 1790,
} as const

export const PHYSICS = {
  gravity: 2300,
  moveSpeed: 430,
  acceleration: 3200,
  jumpVelocity: 860,
  /** Margen para saltar justo después de dejar el suelo o justo antes de tocarlo. */
  /** Anticipación: se agacha este tiempo antes de despegar. */
  jumpWindup: 0.07,
  coyoteTime: 0.08,
  jumpBuffer: 0.12,
  maxDelta: 1 / 30,
} as const

export const PLAYER = {
  /** Tamaño de dibujo (proporción de hooded-runner: 360×328). */
  /** Tamaño real de hooded-runner (px). */
  sourceWidth: 360,
  sourceHeight: 328,
  drawWidth: 118,
  drawHeight: 108,
  /** Hitbox respecto a los pies (centro inferior). */
  hitWidth: 44,
  hitHeight: 78,
  /** Píxeles transparentes bajo los pies dentro del sprite. */
  footOffset: 4,
} as const

export const ECHO = {
  count: 8,
  drawWidth: 22,
  drawHeight: 37,
  hitSize: 26,
  /** Altura (sobre el suelo) de los ecos bajos y de los que exigen salto. */
  lowHeight: 62,
  highHeight: 168,
  /** Patrón alto/bajo de los 8 ecos. */
  pattern: [false, true, false, false, true, false, true, false],
  floatAmplitude: 6,
  floatSpeed: 2.2,
  pulseSpeed: 3.1,
  fadeDuration: 0.35,
} as const

/** Capa animada deformando el sprite con una malla (ver CapeWarp). Distancias en unidades de mundo. */
export const CAPE = {
  /** Fracción del ancho del sprite donde empieza la capa (a la izquierda queda la espalda). */
  pivot: 0.62,
  /** Resolución de la malla. */
  columns: 14,
  rows: 10,
  /** Amplitud de la onda en reposo y extra a toda velocidad / en el aire. */
  idleWave: 2.6,
  runWave: 7.5,
  idleFrequency: 2.6,
  runFrequency: 13,
  /** Cuánto se estira la punta hacia atrás (y hacia delante al frenar, por inercia). */
  stretch: 24,
  stretchStiffness: 110,
  stretchDamping: 8,
  /** Desplazamiento vertical de la punta al subir (abajo) o caer (arriba). */
  lift: 26,
  liftStiffness: 140,
  liftDamping: 7,
} as const

/** Animación procedural del cuerpo. */
export const BODY = {
  stepFrequency: 13,
  runBob: 7,
  stepSquash: 0.06,
  runLean: 0.17,
  airLean: 0.2,
  breathAmount: 0.03,
  breathSpeed: 2.4,
  landSquash: 0.34,
  /** Animación en el aire. */
  airWobble: 0.07,
  airWobbleSpeed: 9,
  apexLean: 0.14,
  airStretch: 0.1,
  /** Agachada previa al salto (anticipación). */
  windupSquash: 0.3,
  takeoffStretch: 0.22,
  /** Giro: el voltear es instantáneo y se disimula con una frenada breve. */
  turnRecovery: 6,
  turnSquash: 0.12,
  turnHop: 3,
  turnLean: 0.22,
} as const

/**
 * Piernas procedurales. Caderas y franja oculta en px del sprite; longitudes y grosores en unidades de mundo.
 */
export const LEGS = {
  hideRect: { x0: 150, x1: 315, y0: 270 },
  backHip: { x: 198, y: 250 },
  frontHip: { x: 250, y: 250 },
  thighLength: 11,
  shinLength: 10.6,
  thighWidth: 4.4,
  shinWidth: 3.6,
  bootLength: 3.8,
  bootWidth: 3.6,
  stride: 0.75,
  kneeLift: 1.35,
  airPedal: 0.45,
  airPedalSpeed: 14,
  backColor: '#19131a',
  frontColor: '#2b2224',
  bootColor: '#0b0909',
} as const

/** Brazos procedurales. Hombros y zona oculta en px del sprite; el resto en unidades de mundo. */
export const ARMS = {
  hideRect: { x0: 285, y0: 136, x1: 345, y1: 214 },
  frontShoulder: { x: 272, y: 150 },
  backShoulder: { x: 232, y: 152 },
  upperLength: 9.5,
  foreLength: 8.5,
  width: 4.4,
  /** Borde algo más claro para que la manga se lea sobre el fondo oscuro. */
  rimWidth: 1.3,
  handRadius: 2.2,
  runSwing: 0.8,
  airFlap: 0.35,
  airFlapSpeed: 12,
  frontColor: '#241c1d',
  backColor: '#160f10',
  rimColor: '#5a4a47',
  backRimColor: '#33292a',
  handColor: '#e9e1d5',
  backHandColor: '#a39a8e',
} as const

export const PARTICLES = {
  perBurst: 16,
  life: 0.65,
  speed: 170,
  drag: 2.6,
} as const

export const DUST = {
  life: 0.55,
  perStep: 2,
  perJump: 10,
  perLanding: 18,
  perTurn: 5,
} as const

export const HUD_TICK_SECONDS = 0.1
export const BEST_TIME_KEY = 'echo-collector:best-time'
