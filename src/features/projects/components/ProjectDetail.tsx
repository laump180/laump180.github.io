import { ChevronDown } from 'lucide-react'
import { Button, Ornament } from '@/shared/ui'
import type { Project } from '../types'
import { ProjectCover } from './ProjectCover'
import { ProjectTags } from './ProjectTags'

function Badges({ items }: { items: readonly string[] }) {
  return (
    <ul aria-label="Contexto del proyecto" className="flex flex-wrap gap-2">
      {items.map((badge) => (
        <li
          key={badge}
          className="rounded-full border border-ash-800 px-3 py-1 text-xs tracking-wide text-ash-300"
        >
          {badge}
        </li>
      ))}
    </ul>
  )
}

export function ProjectDetail({ project }: { project: Project }) {
  const { title, tags, badges, description, contribution, details, image, links } = project

  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
      <div className="border border-ash-800 p-2.5 lg:sticky lg:top-20">
        <ProjectCover cover={image} className="aspect-[756/400] w-full border border-ash-800" />
      </div>
      <div>
        {badges && <Badges items={badges} />}
        <h1 className="mt-5 flex items-center gap-4 font-display text-5xl leading-none text-bone-100 sm:text-6xl">
          {title}
          <Ornament variant="sparkle" twinkle className="size-3.5" />
        </h1>
        <ProjectTags tags={tags} className="mt-5" />
        <p className="mt-6 text-lg leading-relaxed text-ash-300">{description}</p>

        {contribution && (
          <section className="mt-8 border-l-2 border-wine-500 pl-5">
            <h2 className="font-display text-xl text-bone-100">{contribution.title}</h2>
            <p className="mt-2 leading-relaxed text-ash-300">{contribution.body}</p>
          </section>
        )}

        {details && details.length > 0 && (
          <details className="group mt-8 border-t border-ash-800 pt-5">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-bone-100 [&::-webkit-details-marker]:hidden">
              <ChevronDown
                aria-hidden
                strokeWidth={1.25}
                className="size-4 -rotate-90 transition-transform group-open:rotate-0 motion-reduce:transition-none"
              />
              Más sobre mi trabajo y el equipo
            </summary>
            <div className="mt-4 space-y-3 leading-relaxed text-ash-300">
              {details.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </details>
        )}

        {links && links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map((link) => (
              <Button
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                arrow
                size="sm"
              >
                {link.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
