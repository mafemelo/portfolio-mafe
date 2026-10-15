import { useTranslation } from 'react-i18next'
import { SECTIONS, type SectionId } from './sections'

type Props = { active: SectionId | null; onOpen: (id: SectionId) => void }

export default function Header({ active, onOpen }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.startsWith('en') ? 'en' : 'pt'

  return (
    <header className="header">
      <span className="brand">{t('brand')}</span>

      <nav className="nav" aria-label={t('nav.menu')}>
        {SECTIONS.map((id) => (
          <button
            key={id}
            className={'nav-link' + (active === id ? ' is-active' : '')}
            aria-current={active === id ? 'page' : undefined}
            onClick={() => onOpen(id)}
          >
            {t(`nav.${id}`)}
          </button>
        ))}
      </nav>

      <div className="header-right">
        <span className="tagline">{t('tagline')}</span>
        <div className="lang" role="group" aria-label={t('desktop.lang')}>
          {(['pt', 'en'] as const).map((l) => (
            <button
              key={l}
              className={'lang-btn' + (lang === l ? ' is-active' : '')}
              aria-pressed={lang === l}
              onClick={() => i18n.changeLanguage(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
