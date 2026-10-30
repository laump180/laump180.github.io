import { Fragment, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { Container, LogoDiamondIcon, Ornament } from '@/shared/ui'
import { Logo } from './Logo'
import { NAV_ITEMS } from './navLinks'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative py-1 text-[15px] tracking-wide transition-colors duration-300 hover:text-bone-100',
    'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-bone-100/60 after:transition-transform after:duration-300',
    isActive ? 'text-bone-100 after:scale-x-100' : 'text-ash-300 after:scale-x-0',
  )

export function Navbar() {
  const { pathname } = useLocation()
  // El menú móvil se asocia a la ruta en que se abrió: al navegar se cierra solo.
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === pathname

  return (
    <header className="sticky top-0 z-40 border-y border-ash-800 bg-ash-950/90 backdrop-blur-sm">
      <Container className="flex h-[52px] items-center justify-between">
        <Logo />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <Fragment key={item.to}>
                {i > 0 && (
                  <li aria-hidden>
                    <Ornament className="size-2" />
                  </li>
                )}
                <li>
                  <NavLink to={item.to} className={linkClass}>
                    {item.label}
                  </NavLink>
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>

        <div aria-hidden className="hidden items-center gap-4 md:flex">
          <span className="h-px w-16 bg-ash-800" />
          <Ornament variant="sparkle" className="size-2.5 text-ash-500" />
          <LogoDiamondIcon className="ml-6 size-7 text-ash-300" />
        </div>

        <button
          type="button"
          className="p-2 text-bone-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpenAt(open ? null : pathname)}
        >
          {open ? (
            <X className="size-5" strokeWidth={1.25} />
          ) : (
            <Menu className="size-5" strokeWidth={1.25} />
          )}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Principal móvil"
          className="border-t border-ash-800 md:hidden"
        >
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={(s) => cn(linkClass(s), 'block px-4 py-3 after:hidden')}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
