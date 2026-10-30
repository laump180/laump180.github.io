import { Fragment } from 'react'
import { cn } from '@/shared/lib/cn'
import { Tag, UnityIcon } from '@/shared/ui'

interface ProjectTagsProps {
  tags: readonly string[]
  className?: string
}

/** Tags separados por líneas verticales; "Unity" lleva su logo. */
export function ProjectTags({ tags, className }: ProjectTagsProps) {
  return (
    <ul
      aria-label="Tecnologías y temas"
      className={cn('flex flex-wrap items-center gap-x-4 gap-y-1', className)}
    >
      {tags.map((tag, i) => (
        <Fragment key={tag}>
          {i > 0 && <li aria-hidden className="h-3 w-px bg-ash-500/60" />}
          <li>
            <Tag
              className="text-[13px]"
              icon={tag === 'Unity' ? <UnityIcon className="size-3.5 text-bone-100" /> : undefined}
            >
              {tag}
            </Tag>
          </li>
        </Fragment>
      ))}
    </ul>
  )
}
