import { Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { AmbientAudioControl } from '@/features/ambient-audio'
import { Footer, Navbar } from '@/shared/layout'
import { cn } from '@/shared/lib/cn'

export function RootLayout() {
  const navigation = useNavigation()
  const loading = navigation.state === 'loading'

  return (
    <div className="relative flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-wine-900 focus:px-4 focus:py-2 focus:text-bone-100"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main
        id="contenido"
        className={cn('flex-1 transition-opacity duration-300', loading && 'opacity-60')}
      >
        <Outlet />
      </main>
      <Footer />
      <AmbientAudioControl />
      <ScrollRestoration />
    </div>
  )
}
