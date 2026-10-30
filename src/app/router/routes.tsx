import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/app/layouts/RootLayout'
import { RouteError } from '@/app/layouts/RouteError'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: RootLayout,
      ErrorBoundary: RouteError,
      HydrateFallback: () => null,
      children: [
        {
          index: true,
          lazy: async () => ({ Component: (await import('@/features/home')).HomePage }),
        },
        {
          path: 'proyectos',
          lazy: async () => ({ Component: (await import('@/features/projects')).ProjectsPage }),
        },
        {
          path: 'proyectos/:slug',
          lazy: async () => ({
            Component: (await import('@/features/projects')).ProjectDetailPage,
          }),
        },
        {
          path: 'sobre-mi',
          lazy: async () => ({ Component: (await import('@/features/about')).AboutPage }),
        },
        {
          path: 'contacto',
          lazy: async () => ({ Component: (await import('@/features/contact')).ContactPage }),
        },
        {
          path: '*',
          lazy: async () => ({ Component: (await import('@/features/not-found')).NotFoundPage }),
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
