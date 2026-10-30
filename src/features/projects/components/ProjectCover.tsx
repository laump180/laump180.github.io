import { cn } from '@/shared/lib/cn'
import { UnityIcon } from '@/shared/ui'
import type { ProjectCover as Cover } from '../types'

interface ProjectCoverProps {
  cover: Cover
  /** Clases del <img> o del panel del logo (tamaño, aspecto, efectos). */
  className?: string
  lazy?: boolean
}

/** Portada de un proyecto: una imagen o, si no hay captura adecuada, el logo de su motor. */
export function ProjectCover({ cover, className, lazy = false }: ProjectCoverProps) {
  if ('logo' in cover) {
    return (
      <div
        role="img"
        aria-label={cover.alt}
        className={cn(
          'grid place-items-center bg-ash-950 bg-[radial-gradient(circle_at_50%_45%,rgb(241_233_221/0.08),transparent_60%)]',
          className,
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <UnityIcon className="size-16 text-bone-100 sm:size-20" />
          <span className="text-xs tracking-caps text-ash-300 uppercase">Unity</span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={cover.src}
      alt={cover.alt}
      width={756}
      height={400}
      loading={lazy ? 'lazy' : undefined}
      className={cn('object-cover', className)}
    />
  )
}
