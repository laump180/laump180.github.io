import { GITHUB_URL, LINKEDIN_URL } from '@/shared/layout'
import { Button, GithubIcon } from '@/shared/ui'
import { LinkedinIcon } from '@/shared/ui/LinkedinIcon'
export function HeroActions() {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-5">
      <Button to="/proyectos" arrow >
        Ver proyectos
      </Button>

      <Button
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        icon={<GithubIcon className="size-6" />}
        className="w-[158px]"
      >
        GitHub
      </Button>

      <Button
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        icon={<LinkedinIcon className="size-6" />}
        
      >
        LinkedIn ↗
      </Button>
    </div>
  )
}