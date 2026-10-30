import { Ornament } from '@/shared/ui'
import type { TimelineEntry } from '../data/profile'

interface TimelineProps {
  id: string
  title: string
  entries: readonly TimelineEntry[]
}

function Entry({ entry }: { entry: TimelineEntry }) {
  return (
    <li className="relative pl-7">
      <Ornament
        variant={entry.current ? 'sparkle' : 'diamond'}
        twinkle={entry.current}
        className="absolute top-2 left-0 size-2.5"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-display text-2xl leading-tight text-bone-100">{entry.title}</h4>
        <p className="text-sm tracking-wide text-ash-500 tabular-nums">
          {entry.period}
          {entry.current && <span className="ml-2 text-wine-500">· en curso</span>}
        </p>
      </div>
      <p className="mt-1 text-ash-300">
        {entry.organization} <span className="text-ash-500">· {entry.place}</span>
      </p>
      {entry.highlights && (
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ash-300">
          {entry.highlights.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-ash-500" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function Timeline({ id, title, entries }: TimelineProps) {
  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="text-xs tracking-caps text-bone-100 uppercase">
        {title}
      </h3>
      <span aria-hidden className="mt-3 block h-px w-24 bg-ash-800" />
      <ol className="mt-6 space-y-8 border-l border-ash-800/70 pl-0 [&>li]:-ml-[5px]">
        {entries.map((entry) => (
          <Entry key={`${entry.organization}-${entry.period}`} entry={entry} />
        ))}
      </ol>
    </section>
  )
}
