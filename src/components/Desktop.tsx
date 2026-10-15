import { useTranslation } from 'react-i18next'
import { SECTIONS, type SectionId } from './sections'
import { SLOTS, type Pin } from '../lib/pins'

const LABEL_KEY: Record<SectionId, string> = {
  about: 'nav.about',
  contact: 'nav.contact',
  projects: 'nav.projects',
  experience: 'nav.experience',
}

type Props = {
  onOpen: (id: SectionId) => void
  onCamera: () => void
  pins: Pin[]
  onRemovePin: (id: string) => void
}

export default function Desktop({ onOpen, onCamera, pins, onRemovePin }: Props) {
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

      <button className="camera-icon" onClick={onCamera} aria-label={t('camera.openAria')}>
        <svg width="92" height="66" viewBox="0 0 92 66" aria-hidden="true">
          <rect x="14" y="2" width="22" height="9" rx="3" fill="#fff" stroke="#dddce3" />
          <rect x="1" y="9" width="90" height="55" rx="10" fill="#fff" stroke="#dddce3" />
          <rect x="1" y="17" width="22.5" height="7" style={{ fill: 'oklch(0.6 0.13 295)' }} />
          <rect x="23.5" y="17" width="22.5" height="7" style={{ fill: 'oklch(0.6 0.13 30)' }} />
          <rect x="46" y="17" width="22.5" height="7" style={{ fill: 'oklch(0.6 0.13 190)' }} />
          <rect x="68.5" y="17" width="22.5" height="7" style={{ fill: 'oklch(0.6 0.13 80)' }} />
          <circle cx="46" cy="42" r="15" fill="#fff" stroke="#dddce3" />
          <circle cx="46" cy="42" r="11.5" fill="#24222b" />
          <circle cx="46" cy="42" r="5.5" style={{ fill: 'oklch(0.35 0.13 295)' }} />
          <circle cx="42" cy="38" r="1.8" fill="#fff" opacity=".7" />
          <rect x="68" y="30" width="13" height="7" rx="2" fill="#ecebf0" />
          <rect x="26" y="59" width="40" height="2.5" rx="1.25" fill="#dddce3" />
        </svg>
        <span className="folder-label">{t('camera.label')}</span>
      </button>

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

      <div className="pins">
        {pins.map((p) => {
          const s = SLOTS[p.slot]
          return (
            <figure
              key={p.id}
              className="pin"
              style={{ ['--x' as string]: `${s.x}%`, ['--y' as string]: `${s.y}%`, ['--r' as string]: `${s.r}deg` }}
            >
              <span className="tape" aria-hidden="true" />
              <img src={p.src} alt={p.caption || t('camera.polaroidAlt')} />
              <figcaption>{p.caption}</figcaption>
              <button className="pin-x" onClick={() => onRemovePin(p.id)} aria-label={t('camera.removePin')}>×</button>
            </figure>
          )
        })}
      </div>
    </section>
  )
}