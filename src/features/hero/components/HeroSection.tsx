import { Container, Reveal } from '@/shared/ui'
import { HeroActions } from './HeroActions'
import { HeroArt } from './HeroArt'

const SKILLS = ['Unity', 'C#', 'UI y audio'] as const

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-ash-800 lg:min-h-[376px]"
    >
      <HeroArt />
      <Container className="relative -mt-10 pb-12 sm:-mt-20 lg:mt-0 lg:flex lg:min-h-[inherit] lg:items-center lg:py-10">
        <Reveal className="max-w-[600px] lg:pl-3">
          <p className="text-xs tracking-caps text-ash-300 uppercase sm:text-[13px]">
            Laura Muñoz Pérez / Unity Developer
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-display text-[3.25rem] leading-[0.88] font-normal text-bone-100 sm:text-7xl sm:leading-[0.86] lg:text-[5.25rem]"
          >
            Del código a<br className="hidden sm:block" /> la experiencia
            <span className="text-wine-500">.</span>
          </h1>
          <p className="mt-5 flex items-center gap-3 text-lg tracking-wide text-ash-300">
            {SKILLS.map((skill, i) => (
              <span key={skill} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden>·</span>}
                {skill}
              </span>
            ))}
          </p>
          <div className="mt-8">
            <HeroActions />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
