import { Download, MapPin } from 'lucide-react'
import hoodedHero from '@/shared/assets/sprites/hooded-hero.webp'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { CV_FILENAME, CV_URL } from '@/shared/layout'
import { Button, Container, FramedPanel, Reveal, SectionTitle, SparkleField } from '@/shared/ui'
import { SkillList } from '../components/SkillList'
import { Timeline } from '../components/Timeline'
import { BIO, EDUCATION, EXPERIENCE, PROFILE, SKILL_GROUPS } from '../data/profile'

export function AboutPage() {
  usePageTitle('Sobre mí')

  return (
    <div className="relative">
      <SparkleField />
      <Container className="py-14 sm:py-20">
        <Reveal>
          <SectionTitle as="h1" className="pl-1 sm:pl-6">
            Sobre mí
          </SectionTitle>
        </Reveal>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-ash-300 sm:pl-6">
            <div>
              <p className="font-display text-3xl text-bone-100 sm:text-4xl">
                {PROFILE.name}
                <span className="text-wine-500">.</span>
              </p>
              <p className="mt-2 text-xs tracking-caps text-ash-500 uppercase">{PROFILE.role}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-ash-500">
                <MapPin className="size-4" strokeWidth={1.25} aria-hidden />
                {PROFILE.location}
              </p>
            </div>
            {BIO.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <div className="flex flex-wrap gap-4 pt-3">
              <Button to="/proyectos" arrow>
                Ver proyectos
              </Button>
              <Button
                href={CV_URL}
                download={CV_FILENAME}
                variant="ghost"
                icon={<Download className="size-5" strokeWidth={1.25} aria-hidden />}
              >
                Descargar CV
              </Button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <FramedPanel className="mx-auto max-w-[340px]">
              <div className="grid place-items-center bg-[radial-gradient(circle_at_50%_60%,rgb(142_42_46/0.18),transparent_65%)] px-8 py-10">
                <img
                  src={hoodedHero}
                  alt="Ilustración de una pequeña figura con capucha burdeos que alza la mano hacia un cristal."
                  className="max-h-72 w-auto"
                />
              </div>
            </FramedPanel>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-14 sm:pl-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Timeline id="experiencia" title="Experiencia" entries={EXPERIENCE} />
          </Reveal>
          <Reveal delay={120}>
            <Timeline id="formacion" title="Formación" entries={EDUCATION} />
          </Reveal>
        </div>

        <Reveal className="mt-20 sm:pl-6">
          <SkillList groups={SKILL_GROUPS} />
        </Reveal>
      </Container>
    </div>
  )
}
