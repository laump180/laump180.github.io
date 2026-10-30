import { useEffect } from 'react'

const SITE = 'Laura Muñoz Pérez · Unity Developer'

export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : SITE
  }, [title])
}
