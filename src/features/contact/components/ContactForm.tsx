import { useState, type FormEvent } from 'react'
import { Button } from '@/shared/ui'
import { CONTACT_EMAIL } from '../data/contact'
import { FormField } from './FormField'
import { buildMailto, validateContact, type ContactErrors, type ContactValues } from './validation'

const EMPTY: ContactValues = { name: '', email: '', message: '' }

/** Sin backend: valida y abre el cliente de correo con el mensaje listo. */
export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sent, setSent] = useState(false)

  const bind = (field: keyof ContactValues) => ({
    name: field,
    value: values[field],
    error: errors[field],
    onChange: (value: string) => setValues((v) => ({ ...v, [field]: value })),
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validateContact(values)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    window.location.href = buildMailto(CONTACT_EMAIL, values)
    setSent(true)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="contact-name" label="Nombre" autoComplete="name" {...bind('name')} />
        <FormField
          id="contact-email"
          label="Correo"
          type="email"
          autoComplete="email"
          {...bind('email')}
        />
      </div>
      <FormField id="contact-message" label="Mensaje" multiline {...bind('message')} />
      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" arrow>
          Enviar mensaje
        </Button>
        <p aria-live="polite" className="text-sm text-ash-500">
          {sent ? 'Se abrió tu cliente de correo con el mensaje listo.' : ''}
        </p>
      </div>
    </form>
  )
}
