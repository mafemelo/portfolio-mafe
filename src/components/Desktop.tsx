import { useTranslation } from 'react-i18next'
import { SECTIONS, type SectionId } from './sections'

const LABEL_KEY: Record<SectionId, string> = {
  about: 'nav.about',
  contact: 'nav.contact',
  projects: 'nav.projects',
  experience: 'nav.experience',
}

export default function Desktop({ onOpen }: { onOpen: (id: SectionId) => void }) {
  const { t } = useTranslation()

  return (
    <section className="desktop" aria-label="Desktop">
      <div className="wallpaper" aria-hidden="true" />
      <div className="watermark" aria-hidden="true">[Mafê Melo]</div>

      <div className="note" role="note">
        <span className="tape" aria-hidden="true" />
        <strong>{t('desktop.noteTitle')}</strong>
        <span>{t('desktop.noteText')}</span>
      </div>

      {SECTIONS.map((id) => (
        <button
          key={id}
          className={`folder folder-${id}`}
          onClick={() => onOpen(id)}
          aria-label={`${t('desktop.openFolder')}: ${t(LABEL_KEY[id])}`}
        >
          <span className="folder-shape" aria-hidden="true">
            <span className="folder-tab" />
            <span className="folder-body" />
          </span>
          <span className="folder-label">{t(LABEL_KEY[id]).toLowerCase()}</span>
        </button>
      ))}
    </section>
  )
}
