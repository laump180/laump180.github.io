import { SectionTitle } from '@/shared/ui'
import type { ProjectImage } from '../types'

/** Capturas reales del proyecto. Cada una abre a tamaño completo en otra pestaña. */
export function ProjectGallery({ images }: { images: readonly ProjectImage[] }) {
  return (
    <section aria-labelledby="project-gallery" className="mt-16">
      <SectionTitle as="h2" id="project-gallery" className="mb-6">
        Capturas
      </SectionTitle>
      <ul className="grid gap-5 md:grid-cols-2">
        {images.map((image) => (
          <li key={image.src}>
            <figure className="border border-ash-800 p-2.5">
              <a
                href={image.src}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden border border-ash-800"
                aria-label={`Ver captura a tamaño completo: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transform-none"
                />
              </a>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
