import { siGithub, siUnity, type SimpleIcon } from 'simple-icons'
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const decorative = { 'aria-hidden': true, focusable: false } as const

export function ArrowIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...decorative}
      {...props}
    >
      <path d="M1 6h17M13 1l5 5-5 5" />
    </svg>
  )
}

export function DiamondIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      {...decorative}
      {...props}
    >
      <path d="M6 1 11 6 6 11 1 6Z" />
    </svg>
  )
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...decorative} {...props}>
      <path d="M8 0c.4 4.2 3.8 7.6 8 8-4.2.4-7.6 3.8-8 8-.4-4.2-3.8-7.6-8-8 4.2-.4 7.6-3.8 8-8Z" />
    </svg>
  )
}

export function LogoDiamondIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      {...decorative}
      {...props}
    >
      <path d="M16 2 30 16 16 30 2 16Z" />
      <path d="M16 9 23 16 16 23 9 16Z" />
      <path d="M16 2v7M30 16h-7M16 30v-7M2 16h7" strokeWidth={0.6} />
    </svg>
  )
}

export function FrameCornerIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      {...decorative}
      {...props}
    >
      <path d="M1 23V7a6 6 0 0 1 6-6h16" />
      <path d="M5 23V9a4 4 0 0 1 4-4h14" strokeWidth={0.5} />
      <path d="M1 1l3 3" />
    </svg>
  )
}

function BrandIcon({ icon, ...props }: IconProps & { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...decorative} {...props}>
      <path d={icon.path} />
    </svg>
  )
}

export function GithubIcon(props: IconProps) {
  return <BrandIcon icon={siGithub} {...props} />
}

export function UnityIcon(props: IconProps) {
  return <BrandIcon icon={siUnity} {...props} />
}
