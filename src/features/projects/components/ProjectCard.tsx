import { Button } from '@/shared/ui'
import type { Project } from '../types'
import { ProjectCover } from './ProjectCover'
import { ProjectTags } from './ProjectTags'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, title, tags, description, image } = project
  const titleId = `project-${slug}`

  return (
    <article
      aria-labelledby={titleId}
      className="group grid h-full gap-5 border border-ash-800 bg-ash-950/60 p-2.5 transition-colors duration-300 hover:border-ash-500/70 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] sm:gap-6"
    >
      <div className="overflow-hidden border border-ash-800">
        <ProjectCover
          cover={image}
          lazy
          className="aspect-[756/400] size-full transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none sm:aspect-auto"
        />
      </div>
      <div className="flex flex-col px-2 pb-3 sm:px-0 sm:pt-3 sm:pr-4">
        <h3 id={titleId} className="font-display text-3xl leading-none text-bone-100">
          {title}
        </h3>
        <ProjectTags tags={tags} className="mt-4" />
        <p className="mt-4 text-[15px] leading-relaxed text-ash-300">{description}</p>
        <Button to={`/proyectos/${slug}`} size="sm" arrow className="mt-5 self-start sm:mt-auto">
          Ver proyecto
        </Button>
      </div>
    </article>
  )
}
