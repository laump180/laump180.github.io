import { Ornament } from '@/shared/ui'
import type { SkillGroup } from '../data/profile'

export function SkillList({ groups }: { groups: readonly SkillGroup[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, i) => (
        <section key={group.title} aria-labelledby={`skills-${i}`}>
          <h3 id={`skills-${i}`} className="text-xs tracking-caps text-bone-100 uppercase">
            {group.title}
          </h3>
          <span aria-hidden className="mt-3 block h-px w-24 bg-ash-800" />
          <ul className="mt-4 space-y-2">
            {group.items.map((item) => (
              <li key={item} className="flex items-center gap-3 text-ash-300">
                <Ornament className="size-2" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
