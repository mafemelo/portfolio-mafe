import { useTranslation } from 'react-i18next'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { CONTACT } from '../data/config'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <span>{t('footer')}</span>
      <span className="footer-links">
        <a href={`mailto:${CONTACT.email}`} aria-label="E-mail"><MdEmail /></a>
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
      </span>
    </footer>
  )
}
