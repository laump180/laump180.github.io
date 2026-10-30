import type { ChangeEvent } from 'react'
import { cn } from '@/shared/lib/cn'

interface FormFieldProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  multiline?: boolean
  type?: 'text' | 'email'
  autoComplete?: string
}

const fieldClass =
  'w-full border border-ash-800 bg-ash-950/70 px-4 py-3 text-bone-100 placeholder:text-ash-500 transition-colors focus:border-ash-300 focus:outline-none'

export function FormField({
  id,
  label,
  error,
  multiline = false,
  onChange,
  type = 'text',
  ...rest
}: FormFieldProps) {
  const errorId = `${id}-error`
  const shared = {
    ...rest,
    id,
    required: true,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: cn(fieldClass, error && 'border-wine-500'),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs tracking-caps text-ash-300 uppercase">
        {label}
      </label>
      {multiline ? <textarea rows={6} {...shared} /> : <input type={type} {...shared} />}
      {error && (
        <p id={errorId} className="text-sm text-[#c7686b]">
          {error}
        </p>
      )}
    </div>
  )
}
