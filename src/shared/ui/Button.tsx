import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { ArrowIcon } from './icons'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'sm'

const base =
  'group inline-flex items-center justify-center gap-3 border font-body tracking-wide transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'border-wine-500/70 bg-wine-900 text-bone-100 hover:border-wine-500 hover:bg-[#4a2727]',
  ghost: 'border-ash-500/70 bg-transparent text-bone-100 hover:border-ash-300 hover:bg-bone-100/5',
}

const sizes: Record<Size, string> = {
  md: 'h-13 px-8 text-lg',
  sm: 'h-11 px-7 text-base',
}

interface OwnProps {
  variant?: Variant
  size?: Size
  /** Muestra la flecha → al final (con un leve desplazamiento en hover). */
  arrow?: boolean
  icon?: ReactNode
  className?: string
  children: ReactNode
}

type ButtonProps =
  | (OwnProps & { to: string } & Omit<ComponentProps<typeof Link>, keyof OwnProps | 'to'>)
  | (OwnProps & { href: string } & Omit<ComponentProps<'a'>, keyof OwnProps | 'href'>)
  | (OwnProps & Omit<ComponentProps<'button'>, keyof OwnProps>)

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    arrow = false,
    icon,
    className,
    children,
    ...rest
  } = props
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowIcon className="h-3 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
      )}
    </>
  )

  if ('to' in rest) {
    return (
      <Link className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  if ('href' in rest) {
    return (
      <a className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
