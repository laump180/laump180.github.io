import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

export function Container({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-10', className)}
      {...rest}
    />
  )
}
