import { Reveal } from '@/shared/ui'
import type { Project } from '../types'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: readonly Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal as="li" key={project.slug} delay={i * 120}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </ul>
  )
}
