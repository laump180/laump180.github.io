const LEFT_KEYS = new Set(['ArrowLeft', 'KeyA'])
const RIGHT_KEYS = new Set(['ArrowRight', 'KeyD'])
const JUMP_KEYS = new Set(['Space', 'ArrowUp', 'KeyW'])
const SWIPE_UP_THRESHOLD = 28

/**
 * Teclado + táctil. Los eventos se escuchan en el propio canvas,
 * así que solo hay entrada cuando el canvas tiene el foco.
 */
export class Input {
  private keys = new Set<string>()
  private pointerDir: -1 | 0 | 1 = 0
  private pointerStart: { id: number; y: number; jumped: boolean } | null = null
  private jumpQueued = false
  private readonly element: HTMLElement
  enabled = false

  constructor(element: HTMLElement) {
    this.element = element
    element.addEventListener('keydown', this.onKeyDown)
    element.addEventListener('keyup', this.onKeyUp)
    element.addEventListener('blur', this.reset)
    element.addEventListener('pointerdown', this.onPointerDown)
    element.addEventListener('pointermove', this.onPointerMove)
    element.addEventListener('pointerup', this.onPointerEnd)
    element.addEventListener('pointercancel', this.onPointerEnd)
  }

  /** -1 izquierda, 1 derecha, 0 quieto. */
  get direction(): number {
    const keyDir = (this.has(RIGHT_KEYS) ? 1 : 0) - (this.has(LEFT_KEYS) ? 1 : 0)
    return keyDir !== 0 ? keyDir : this.pointerDir
  }

  /** Devuelve true una vez por pulsación de salto. */
  consumeJump(): boolean {
    const queued = this.jumpQueued
    this.jumpQueued = false
    return queued
  }

  readonly reset = (): void => {
    this.keys.clear()
    this.pointerDir = 0
    this.pointerStart = null
    this.jumpQueued = false
  }

  destroy(): void {
    const el = this.element
    el.removeEventListener('keydown', this.onKeyDown)
    el.removeEventListener('keyup', this.onKeyUp)
    el.removeEventListener('blur', this.reset)
    el.removeEventListener('pointerdown', this.onPointerDown)
    el.removeEventListener('pointermove', this.onPointerMove)
    el.removeEventListener('pointerup', this.onPointerEnd)
    el.removeEventListener('pointercancel', this.onPointerEnd)
  }

  private has(set: Set<string>): boolean {
    for (const key of set) if (this.keys.has(key)) return true
    return false
  }

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (!this.enabled) return
    const handled = LEFT_KEYS.has(e.code) || RIGHT_KEYS.has(e.code) || JUMP_KEYS.has(e.code)
    if (!handled) return
    e.preventDefault()
    if (JUMP_KEYS.has(e.code) && !e.repeat) this.jumpQueued = true
    this.keys.add(e.code)
  }

  private readonly onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code)
  }

  private readonly onPointerDown = (e: PointerEvent): void => {
    if (!this.enabled) return
    const rect = this.element.getBoundingClientRect()
    this.pointerDir = e.clientX - rect.left < rect.width / 2 ? -1 : 1
    this.pointerStart = { id: e.pointerId, y: e.clientY, jumped: false }
    this.element.setPointerCapture(e.pointerId)
  }

  private readonly onPointerMove = (e: PointerEvent): void => {
    const start = this.pointerStart
    if (!start || start.id !== e.pointerId || start.jumped) return
    if (start.y - e.clientY > SWIPE_UP_THRESHOLD) {
      start.jumped = true
      this.jumpQueued = true
    }
  }

  private readonly onPointerEnd = (e: PointerEvent): void => {
    if (this.pointerStart?.id !== e.pointerId) return
    this.pointerStart = null
    this.pointerDir = 0
  }
}
