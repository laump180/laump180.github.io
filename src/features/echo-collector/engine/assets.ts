import type { GameAssets } from './types'

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`No se pudo cargar ${src}`))
    image.src = src
  })
}

export interface AssetUrls {
  background: string
  player: string
  echo: string
}

export async function loadGameAssets(urls: AssetUrls): Promise<GameAssets> {
  const [background, player, echo] = await Promise.all([
    loadImage(urls.background),
    loadImage(urls.player),
    loadImage(urls.echo),
  ])
  return { background, player, echo }
}
