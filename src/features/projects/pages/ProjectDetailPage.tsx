import { Link, useParams } from 'react-router'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { ArrowIcon, Button, Container, Reveal } from '@/shared/ui'
import { ProjectDetail } from '../components/ProjectDetail'
import { ProjectGallery } from '../components/ProjectGallery'
import { getProjectBySlug } from '../data/projects'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  usePageTitle(project?.title ?? 'Proyecto no encontrado')

  return (
    <Container className="py-12 sm:py-16">
      <Link
        to="/proyectos"
        className="group inline-flex items-center gap-3 text-[15px] text-ash-300 transition-colors hover:text-bone-100"
      >
        <ArrowIcon className="h-2.5 w-4 rotate-180 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none" />
        Todos los proyectos
      </Link>
      <Reveal className="mt-8">
        {project ? (
          <>
            <ProjectDetail project={project} />
            {project.gallery && project.gallery.length > 0 && (
              <ProjectGallery images={project.gallery} />
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <h1 className="font-display text-4xl text-bone-100">
              Este proyecto no existe… todavía.
            </h1>
            <Button to="/proyectos" arrow className="mt-8">
              Ver proyectos
            </Button>
          </div>
        )}
      </Reveal>
    </Container>
  )
}
