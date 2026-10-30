import { GITHUB_URL } from '@/shared/layout'
import { Button, GithubIcon } from '@/shared/ui'

export function HeroActions() {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-5">
      <Button to="/proyectos" arrow className="w-[212px]">
        Ver proyectos
      </Button>
      <Button
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        variant="ghost"
        icon={<GithubIcon className="size-6" />}
        className="w-[158px]"
      >
        GitHub
      </Button>
    </div>
  )
}
