import { CAPE } from './config'
import type { Cape } from './Cape'

export interface WarpOptions {
  /** Atenúa la onda (prefers-reduced-motion). */
  reducedMotion: boolean
}

interface Point {
  x: number
  y: number
}

/** Expansión de cada triángulo (unidades destino) para que no se vean costuras. */
const SEAM_PAD = 0.9

/**
 * Peso de deformación en (u, v) del sprite, ambos en [0, 1]:
 * 0 en la parte delantera (cara, cuerpo); máximo en la punta inferior trasera.
 * La parte alta queda medio anclada, como si la capa colgara de los hombros.
 */
function capeWeight(u: number, v: number): number {
  const back = Math.min(1, Math.max(0, (CAPE.pivot - u) / CAPE.pivot))
  return back ** 1.2 * (0.3 + 0.7 * v)
}

function displacement(u: number, v: number, cape: Cape, waveAmp: number): Point {
  const w = capeWeight(u, v)
  if (w === 0) return { x: 0, y: 0 }
  const ripple = Math.sin(cape.phase - u * 9 + v * 4)
  const sway = Math.cos(cape.phase * 0.8 - u * 7 + v * 3)
  return {
    x: (-cape.stretch * CAPE.stretch + sway * waveAmp * 0.6) * w,
    y: (cape.lift * CAPE.lift + ripple * waveAmp) * w,
  }
}

/** Matriz afín que lleva el triángulo s al triángulo d. */
function affine(s: Triangle, d: Triangle) {
  const [s0, s1, s2] = s
  const [d0, d1, d2] = d
  const den = (s1.x - s0.x) * (s2.y - s0.y) - (s2.x - s0.x) * (s1.y - s0.y)
  const a = ((d1.x - d0.x) * (s2.y - s0.y) - (d2.x - d0.x) * (s1.y - s0.y)) / den
  const c = ((d2.x - d0.x) * (s1.x - s0.x) - (d1.x - d0.x) * (s2.x - s0.x)) / den
  const b = ((d1.y - d0.y) * (s2.y - s0.y) - (d2.y - d0.y) * (s1.y - s0.y)) / den
  const dd = ((d2.y - d0.y) * (s1.x - s0.x) - (d1.y - d0.y) * (s2.x - s0.x)) / den
  return { a, b, c, d: dd, e: d0.x - a * s0.x - c * s0.y, f: d0.y - b * s0.x - dd * s0.y }
}

type Triangle = [Point, Point, Point]

function padded(tri: Triangle): Triangle {
  const cx = (tri[0].x + tri[1].x + tri[2].x) / 3
  const cy = (tri[0].y + tri[1].y + tri[2].y) / 3
  const pad = (p: Point): Point => {
    const dx = p.x - cx
    const dy = p.y - cy
    const len = Math.hypot(dx, dy) || 1
    return { x: p.x + (dx / len) * SEAM_PAD, y: p.y + (dy / len) * SEAM_PAD }
  }
  return [pad(tri[0]), pad(tri[1]), pad(tri[2])]
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  src: Triangle,
  dst: Triangle,
): void {
  const m = affine(src, dst)
  const clip = padded(dst)
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(clip[0].x, clip[0].y)
  ctx.lineTo(clip[1].x, clip[1].y)
  ctx.lineTo(clip[2].x, clip[2].y)
  ctx.closePath()
  ctx.clip()
  ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f)
  // Solo la región de la celda (con margen) para no rellenar la imagen entera.
  const minX = Math.max(0, Math.min(src[0].x, src[1].x, src[2].x) - 2)
  const minY = Math.max(0, Math.min(src[0].y, src[1].y, src[2].y) - 2)
  const maxX = Math.min(image.naturalWidth, Math.max(src[0].x, src[1].x, src[2].x) + 2)
  const maxY = Math.min(image.naturalHeight, Math.max(src[0].y, src[1].y, src[2].y) + 2)
  ctx.drawImage(image, minX, minY, maxX - minX, maxY - minY, minX, minY, maxX - minX, maxY - minY)
  ctx.restore()
}

/**
 * Dibuja el sprite como una malla de triángulos con textura. Los vértices de la
 * espalda se desplazan (estiramiento, elevación y onda); los de delante no se mueven.
 * Debe llamarse con el contexto ya trasladado/volteado al sistema del personaje.
 */
export function drawWarpedSprite(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  cape: Cape,
  { reducedMotion }: WarpOptions,
): void {
  const { columns, rows } = CAPE
  const iw = image.naturalWidth
  const ih = image.naturalHeight
  const waveAmp = reducedMotion ? 0 : CAPE.idleWave + CAPE.runWave * cape.flutter

  const src: Point[] = []
  const dst: Point[] = []
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= columns; c++) {
      const u = c / columns
      const v = r / rows
      const off = displacement(u, v, cape, waveAmp)
      src.push({ x: u * iw, y: v * ih })
      dst.push({ x: dx + u * dw + off.x, y: dy + v * dh + off.y })
    }
  }

  const origin: Point = { x: 0, y: 0 }
  const at = (list: Point[], c: number, r: number): Point => list[r * (columns + 1) + c] ?? origin
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const s00 = at(src, c, r)
      const s10 = at(src, c + 1, r)
      const s01 = at(src, c, r + 1)
      const s11 = at(src, c + 1, r + 1)
      const d00 = at(dst, c, r)
      const d10 = at(dst, c + 1, r)
      const d01 = at(dst, c, r + 1)
      const d11 = at(dst, c + 1, r + 1)
      drawTriangle(ctx, image, [s00, s10, s11], [d00, d10, d11])
      drawTriangle(ctx, image, [s00, s11, s01], [d00, d11, d01])
    }
  }
}
