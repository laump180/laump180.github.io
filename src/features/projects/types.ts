export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectImage {
  src: string
  alt: string
}

/** Lo que aportó Laura dentro de un proyecto (a menudo colectivo). */
/** Portada con el logo del motor (cuando no hay una imagen representativa). */
export interface ProjectLogoCover {
  logo: 'unity'
  alt: string
}

export type ProjectCover = ProjectImage | ProjectLogoCover

export interface ProjectContribution {
  title: string
  body: string
}

export interface Project {
  slug: string
  title: string
  tags: readonly string[]
  description: string
  image: ProjectCover
  /** Contexto corto: evento, duración, equipo… */
  badges?: readonly string[]
  contribution?: ProjectContribution
  /** Párrafos extra para el detalle ("Más sobre mi trabajo y el equipo"). */
  details?: readonly string[]
  /** Capturas reales del proyecto, mostradas en el detalle. */
  gallery?: readonly ProjectImage[]
  links?: readonly ProjectLink[]
}
