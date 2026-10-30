import { WORLD } from './config'
import type { Viewport } from './types'

const EDGE_MARGIN = 110

/**
 * Ajuste tipo "cover": el fondo llena el canvas, recortando por los lados
 * (o por arriba si el canvas es muy panorámico) y siempre mostrando el suelo.
 */
export function computeViewport(cssWidth: number, cssHeight: number, dpr: number): Viewport {
  const scale = Math.max(cssWidth / WORLD.width, cssHeight / WORLD.height)
  const visibleWidth = cssWidth / scale
  const visibleHeight = cssHeight / scale
  const offsetX = (WORLD.width - visibleWidth) / 2
  const offsetY = WORLD.height - visibleHeight

  return {
    cssWidth,
    cssHeight,
    dpr,
    scale,
    offsetX,
    offsetY,
    minX: Math.max(WORLD.walkMinX, offsetX + EDGE_MARGIN),
    maxX: Math.min(WORLD.walkMaxX, offsetX + visibleWidth - EDGE_MARGIN),
  }
}
