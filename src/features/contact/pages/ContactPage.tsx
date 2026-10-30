import { Download } from 'lucide-react'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { CV_FILENAME, CV_URL, GITHUB_URL } from '@/shared/layout'
import { Container, FramedPanel, GithubIcon, Reveal, SectionTitle } from '@/shared/ui'
import { ContactForm } from '../components/ContactForm'
import { CONTACT_EMAIL } from '../data/contact'

export function ContactPage() {
  usePageTitle('Contacto')

  return (
    <Container className="py-14 sm:py-20">
      <Reveal>
        <SectionTitle as="h1" className="pl-1 sm:pl-6">
          Contacto
        </SectionTitle>
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-ash-300 sm:pl-6">
          <p>
            ¿Tienes un proyecto, una idea o una vacante? Escríbeme y conversamos sobre cómo llevarlo
            del código a la experiencia.
          </p>
          <div className="flex flex-col gap-3 text-base">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="self-start text-bone-100 underline decoration-ash-500 underline-offset-4 hover:decoration-bone-100"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-start text-ash-300 transition-colors hover:text-bone-100"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
            <a
              href={CV_URL}
              download={CV_FILENAME}
              className="inline-flex items-center gap-2 self-start text-ash-300 transition-colors hover:text-bone-100"
            >
              <Download className="size-4" strokeWidth={1.25} aria-hidden /> Descargar hoja de vida
              (PDF)
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <FramedPanel>
            <div className="p-5 sm:p-8">
              <ContactForm />
            </div>
          </FramedPanel>
        </Reveal>
      </div>
    </Container>
  )
}
