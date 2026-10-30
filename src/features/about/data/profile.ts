export interface SkillGroup {
  title: string
  items: readonly string[]
}

export interface TimelineEntry {
  title: string
  organization: string
  place: string
  period: string
  /** true si sigue en curso. */
  current?: boolean
  highlights?: readonly string[]
}

export const PROFILE = {
  name: 'Laura Muñoz Pérez',
  role: 'Desarrolladora de Videojuegos · Unity',
  location: 'Medellín, Colombia',
} as const

export const BIO: readonly string[] = [
  'Soy desarrolladora de software con experiencia en creación de componentes, corrección de errores y mantenimiento de aplicaciones web con React y JavaScript.',
  'Actualmente me formo en desarrollo de videojuegos con Unity y C#, y he publicado un proyecto académico interactivo. Aporto capacidad de aprendizaje, resolución de problemas y trabajo en equipo para iniciar mi trayectoria en la industria de videojuegos.',
]

export const EDUCATION: readonly TimelineEntry[] = [
  {
    title: 'Desarrollador Junior Unity',
    organization: 'Generation Colombia',
    place: 'Modalidad virtual',
    period: '09/2026 – 12/2026',
    current: true,
  },
  {
    title: 'Desarrollo Web Full Stack',
    organization: 'Organización Internacional del Trabajo (OIT)',
    place: 'Medellín',
    period: '08/2022 – 11/2022',
  },
  {
    title: 'Tecnóloga en Química Industrial',
    organization: 'SENA',
    place: 'Medellín',
    period: '06/2018 – 08/2020',
  },
]

export const EXPERIENCE: readonly TimelineEntry[] = [
  {
    title: 'Desarrolladora Web',
    organization: 'Xtreme Hardware',
    place: 'Medellín',
    period: '02/2022 – 03/2023',
    highlights: [
      'Desarrollé componentes e interfaces en React, JavaScript, HTML y CSS para un sistema interno, aportando funcionalidades a la aplicación.',
      'Identifiqué y corregí errores para contribuir al funcionamiento y estabilidad del sistema.',
      'Realicé soporte, mantenimiento y ajustes del aplicativo web, atendiendo necesidades del proyecto y colaborando con el equipo.',
    ],
  },
  {
    title: 'Auxiliar de Laboratorio',
    organization: 'Amtex S.A.',
    place: 'Medellín',
    period: '12/2019 – 06/2020',
    highlights: [
      'Apoyé el control de calidad y elaboré reportes técnicos siguiendo procedimientos de seguridad y calidad.',
    ],
  },
]

export const SKILL_GROUPS: readonly SkillGroup[] = [
  { title: 'Videojuegos', items: ['Unity', 'C#', 'UI Toolkit', 'Audio y efectos'] },
  { title: 'Web', items: ['JavaScript', 'React', 'HTML', 'CSS', 'MySQL'] },
  { title: 'Herramientas', items: ['Git', 'GitHub', 'Visual Studio Code'] },
  { title: 'Idiomas', items: ['Español (nativo)', 'Inglés (intermedio)'] },
]
