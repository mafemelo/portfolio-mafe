import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Desktop from './components/Desktop'
import FolderWindow from './components/FolderWindow'
import Footer from './components/Footer'
import type { SectionId } from './components/sections'

export default function App() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<SectionId | null>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)

  const openSection = useCallback((id: SectionId) => {
    lastTrigger.current = document.activeElement as HTMLElement | null
    setOpen(id)
  }, [])

  const close = useCallback(() => {
    setOpen(null)
    lastTrigger.current?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return (
    <div className="page">
      <a className="skip" href="#desktop">{t('nav.menu')}</a>
      <Header active={open} onOpen={openSection} />
      <main id="desktop" className="main">
        <Desktop onOpen={openSection} />
      </main>
      <Footer />
      {open && <FolderWindow section={open} onSelect={setOpen} onClose={close} />}
    </div>
  )
}
