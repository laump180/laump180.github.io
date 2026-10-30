import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

interface TagProps {
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function Tag({ children, icon, className }: TagProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-sm text-ash-300', className)}>
      {icon}
      {children}
    </span>
  )
}
