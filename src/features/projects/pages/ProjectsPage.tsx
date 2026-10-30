import { Container, Reveal, SectionTitle } from '@/shared/ui'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { ProjectGrid } from '../components/ProjectGrid'
import { PROJECTS } from '../data/projects'

export function ProjectsPage() {
  usePageTitle('Proyectos')

  return (
    <Container className="py-14 sm:py-20">
      <Reveal>
        <SectionTitle as="h1" className="pl-1 sm:pl-6">
          Proyectos
        </SectionTitle>
        <p className="mt-5 max-w-2xl pl-1 text-lg leading-relaxed text-ash-300 sm:pl-6">
          Experiencias, prototipos y pequeñas herramientas hechas en Unity: exploración, narrativa,
          mecánicas e interfaces que se sienten bien.
        </p>
      </Reveal>
      <div className="mt-10">
        <ProjectGrid projects={PROJECTS} />
      </div>
    </Container>
  )
}
