import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { CONTACT } from '../data/config'

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined
// Template da resposta automática enviada ao visitante (opcional)
const TEMPLATE_REPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_REPLY_ID as string | undefined

type Errors = Partial<Record<'name' | 'email' | 'message' | 'send', string>>
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const validate = (): Errors => {
    const e: Errors = {}
    if (name.trim().length < 2) e.name = t('contact.errName')
    if (!EMAIL_RE.test(email.trim())) e.email = t('contact.errEmail')
    if (message.trim().length < 3) e.message = t('contact.errMessage')
    return e
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return

    // Sem as chaves, o envio não pode funcionar: avisa em vez de fingir que enviou.
    if (!SERVICE || !TEMPLATE || !KEY) {
      console.error('EmailJS não configurado: preencha o .env e reinicie o npm run dev.')
      setErrors({ send: t('contact.errSend') })
      return
    }

    setSending(true)
    try {
      const params = { from_name: name, from_email: email, reply_to: email, message }

      // 1) mensagem que chega para a Mafê
      await emailjs.send(SERVICE, TEMPLATE, params, { publicKey: KEY })

      // 2) confirmação para o visitante (se falhar, a mensagem principal já foi enviada)
      if (TEMPLATE_REPLY) {
        try {
          await emailjs.send(SERVICE, TEMPLATE_REPLY, params, { publicKey: KEY })
        } catch (err) {
          console.warn('Resposta automática não enviada:', err)
        }
      }

      setSent(true)
    } catch {
      setErrors({ send: t('contact.errSend') })
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    setName(''); setEmail(''); setMessage(''); setErrors({}); setSent(false)
  }

  const links = [
    { label: 'E-mail', href: `mailto:${CONTACT.email}`, text: CONTACT.email, icon: <MdEmail /> },
    CONTACT.whatsapp && {
      label: 'WhatsApp',
      href: `https://wa.me/${CONTACT.whatsapp}`,
      text: 'WhatsApp',
      icon: <FaWhatsapp />,
    },
    { label: 'LinkedIn', href: CONTACT.linkedin, text: 'LinkedIn', icon: <FaLinkedin /> },
    { label: 'GitHub', href: CONTACT.github, text: 'GitHub · mafemelo', icon: <FaGithub /> },
  ].filter(Boolean) as { label: string; href: string; text: string; icon: JSX.Element }[]

  return (
    <div className="contact">
      <div className="contact-form">
        <h2>{t('contact.title')}</h2>
        <p className="lead">{t('contact.subtitle')}</p>

        {sent ? (
          <div className="sent" role="status">
            <h3>{t('contact.okTitle')}</h3>
            <p>{t('contact.okText', { name })}</p>
            <button className="btn btn-ghost" onClick={reset}>{t('contact.again')}</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <label>
              {t('contact.name')}
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
                aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
              {errors.name && <span id="e-name" className="err">{errors.name}</span>}
            </label>
            <label>
              {t('contact.email')}
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
              {errors.email && <span id="e-email" className="err">{errors.email}</span>}
            </label>
            <label>
              {t('contact.message')}
              <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-msg' : undefined} />
              {errors.message && <span id="e-msg" className="err">{errors.message}</span>}
            </label>
            {errors.send && <p className="err" role="alert">{errors.send}</p>}
            <button className="btn btn-primary" type="submit" disabled={sending}>
              {sending ? t('contact.sending') : `${t('contact.send')} ↗`}
            </button>
          </form>
        )}
      </div>

      <aside className="card" aria-label={t('contact.links')}>
        <span className="tape" aria-hidden="true" />
        <h3>Maria Fernanda Melo e Reis</h3>
        <ul>
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                aria-label={l.label}>
                <span className="ico" aria-hidden="true">{l.icon}</span>
                <span>{l.text}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}