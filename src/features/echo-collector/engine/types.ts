export type GameStatus = 'idle' | 'playing' | 'finished'

export interface Vec2 {
  x: number
  y: number
}

/** Caja alineada a los ejes, en unidades de mundo. */
export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface GameAssets {
  background: HTMLImageElement
  player: HTMLImageElement
  echo: HTMLImageElement
}

export interface GameCallbacks {
  onEchoCollected: (collected: number, total: number) => void
  /** Se emite a ~10 Hz mientras se juega. */
  onTimeTick: (seconds: number) => void
  onFinish: (seconds: number) => void
}

export interface GameOptions {
  reducedMotion: boolean
}

/** Relación entre el canvas (px CSS) y el mundo (px del fondo). */
export interface Viewport {
  cssWidth: number
  cssHeight: number
  dpr: number
  /** px CSS por unidad de mundo. */
  scale: number
  /** Esquina superior izquierda visible, en unidades de mundo. */
  offsetX: number
  offsetY: number
  /** Rango horizontal jugable, en unidades de mundo. */
  minX: number
  maxX: number
}
