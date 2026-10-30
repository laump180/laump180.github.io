import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { Button, Container, Ornament, SparkleField } from '@/shared/ui'

export function NotFoundPage() {
  usePageTitle('Página no encontrada')

  return (
    <section className="relative">
      <SparkleField />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <p className="text-xs tracking-caps text-ash-500 uppercase">Error 404</p>
        <h1 className="font-display text-5xl leading-none text-bone-100 sm:text-7xl">
          Un eco perdido<span className="text-wine-500">.</span>
        </h1>
        <div aria-hidden className="flex items-center gap-4">
          <span className="h-px w-16 bg-ash-800" />
          <Ornament variant="sparkle" twinkle />
          <span className="h-px w-16 bg-ash-800" />
        </div>
        <p className="max-w-md text-lg text-ash-300">
          Esta página se desvaneció entre las ruinas. Vuelve al inicio para seguir explorando.
        </p>
        <Button to="/" arrow>
          Volver al inicio
        </Button>
      </Container>
    </section>
  )
}
