import { Link } from 'react-router'
import { Container, GithubIcon, Ornament } from '@/shared/ui'
import { GITHUB_URL } from './navLinks'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-ash-800">
      <Container className="flex flex-col items-center gap-4 pt-8 pb-24 text-sm text-ash-500 sm:flex-row sm:justify-between sm:pb-8">
        <Link to="/" className="font-display text-xl text-bone-100">
          Laura<span className="text-wine-500">.</span>
        </Link>
        <p className="flex items-center gap-3">
          <span>© {year} Laura Muñoz Pérez</span>
          <Ornament className="size-2" />
          <span>Unity Developer</span>
        </p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-bone-100"
        >
          <GithubIcon className="size-4" />
          GitHub
        </a>
      </Container>
    </footer>
  )
}
