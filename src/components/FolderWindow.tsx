import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SECTIONS, HUE, type SectionId } from './sections'
import About from './About'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'

type Props = { section: SectionId; onSelect: (id: SectionId) => void; onClose: () => void }

export default function FolderWindow({ section, onSelect, onClose }: Props) {
  const { t } = useTranslation()
  const closeRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => { bodyRef.current?.scrollTo({ top: 0 }) }, [section])

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="window" role="dialog" aria-modal="true" aria-label={t(`nav.${section}`)}
        style={{ ['--h' as string]: HUE[section] }}>
        <div className="tabs" role="tablist">
          {SECTIONS.map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={id === section}
              className={'tab' + (id === section ? ' is-active' : '')}
              style={{ ['--h' as string]: HUE[id] }}
              onClick={() => onSelect(id)}
            >
              {t(`nav.${id}`).toLowerCase()}
            </button>
          ))}
          <button ref={closeRef} className="close" onClick={onClose} aria-label={t('desktop.closeFolder')}>
            ×
          </button>
        </div>
        <div className="window-body" ref={bodyRef}>
          {section === 'about' && <About />}
          {section === 'projects' && <Projects />}
          {section === 'experience' && <Experience />}
          {section === 'contact' && <Contact />}
        </div>
      </div>
    </div>
  )
}