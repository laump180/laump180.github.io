import { Link } from 'react-router'
import { Container, GithubIcon, Ornament } from '@/shared/ui'
import { GITHUB_URL, LINKEDIN_URL } from './navLinks'
import { LinkedinIcon } from '@/shared/ui/LinkedinIcon'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-ash-800">
      <Container className="flex flex-col items-center gap-4 pt-8 pb-24 text-sm text-ash-500 sm:flex-row sm:justify-between sm:pb-8">
        <Link to="/" className="font-display text-xl text-bone-100">
          Laura<span className="text-wine-500">.</span>
        </Link>

        <p className="flex flex-wrap items-center justify-center gap-3">
          <span>© {year} Laura Muñoz Pérez</span>
          <Ornament className="size-2" />
          <span>Unity Developer</span>
        </p>

        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-bone-100"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-bone-100"
          >
             <LinkedinIcon className="size-4" />
            LinkedIn ↗
          </a>
        </div>
      </Container>
    </footer>
  )
}