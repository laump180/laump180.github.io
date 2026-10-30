import { Link } from 'react-router'
import { ArrowIcon, Container, SectionTitle } from '@/shared/ui'
import { PROJECTS } from '../data/projects'
import { ProjectGrid } from './ProjectGrid'

const FEATURED_COUNT = 2

/** Sección "Proyectos" de la home con los destacados. */
export function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-projects" className="pt-6 sm:pt-8">
      <Container>
        <SectionTitle
          id="featured-projects"
          className="mb-5 pl-1 sm:pl-6"
          action={
            <Link
              to="/proyectos"
              className="group hidden items-center gap-3 border-b border-ash-500/60 pb-0.5 text-[15px] text-bone-100/90 transition-colors hover:border-bone-100 sm:inline-flex"
            >
              Ver todos los proyectos
              <ArrowIcon className="h-2.5 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
          }
        >
          Proyectos
        </SectionTitle>
        <ProjectGrid projects={PROJECTS.slice(0, FEATURED_COUNT)} />
        <Link
          to="/proyectos"
          className="mt-6 inline-flex items-center gap-3 border-b border-ash-500/60 pb-0.5 text-bone-100 sm:hidden"
        >
          Ver todos los proyectos <ArrowIcon className="h-2.5 w-4" />
        </Link>
      </Container>
    </section>
  )
}
