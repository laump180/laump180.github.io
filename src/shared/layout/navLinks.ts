export interface NavItem {
  to: string
  label: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/contacto', label: 'Contacto' },
]

export const GITHUB_URL = 'https://github.com/laump180'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/laura-mu%C3%B1oz-perez-046684257/'

/** Hoja de vida descargable (servida desde public/cv). */
export const CV_URL = `${import.meta.env.BASE_URL}cv/Laura-Munoz-Perez-CV.pdf`
export const CV_FILENAME = 'Laura-Munoz-Perez-CV.pdf'
