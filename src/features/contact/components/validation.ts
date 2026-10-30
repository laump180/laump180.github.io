export interface ContactValues {
  name: string
  email: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Escribe tu nombre.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Escribe un correo válido.'
  if (values.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  }
  return errors
}

export function buildMailto(to: string, { name, email, message }: ContactValues): string {
  const subject = encodeURIComponent(`Contacto desde el portfolio — ${name.trim()}`)
  const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`)
  return `mailto:${to}?subject=${subject}&body=${body}`
}
