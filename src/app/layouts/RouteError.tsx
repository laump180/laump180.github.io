import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Button, Container, Ornament } from '@/shared/ui'

/** Error inesperado en una ruta (carga de chunk fallida, excepción…). */
export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} · ${error.statusText}`
    : 'Algo se rompió en el camino.'

  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center gap-6 text-center">
      <Ornament variant="sparkle" twinkle className="size-4" />
      <h1 className="font-display text-4xl text-bone-100">Un eco perdido</h1>
      <p className="text-ash-300">{message}</p>
      <Button href={import.meta.env.BASE_URL} arrow>
        Volver al inicio
      </Button>
    </Container>
  )
}
