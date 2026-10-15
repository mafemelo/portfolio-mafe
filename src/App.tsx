import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Desktop from './components/Desktop'
import FolderWindow from './components/FolderWindow'
import CameraWindow from './components/CameraWindow'
import { addPin, loadPins, savePins, type Pin } from './lib/pins'
import type { SectionId } from './components/sections'

export default function App() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<SectionId | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [pins, setPins] = useState<Pin[]>(loadPins)
  const lastTrigger = useRef<HTMLElement | null>(null)

  const openSection = useCallback((id: SectionId) => {
    lastTrigger.current = document.activeElement as HTMLElement | null
    setCameraOpen(false)
    setOpen(id)
  }, [])

  const openCamera = useCallback(() => {
    lastTrigger.current = document.activeElement as HTMLElement | null
    setOpen(null)
    setCameraOpen(true)
  }, [])

  const closeCamera = useCallback(() => {
    setCameraOpen(false)
    lastTrigger.current?.focus?.()
  }, [])

  const close = useCallback(() => {
    setOpen(null)
    lastTrigger.current?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (cameraOpen) closeCamera()
      else close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, closeCamera, cameraOpen])

  useEffect(() => { savePins(pins) }, [pins])

  return (
    <div className="page">
      <a className="skip" href="#desktop">{t('nav.menu')}</a>
      <Header active={open} onOpen={openSection} onCamera={openCamera} />
      <main id="desktop" className="main">
        <Desktop
          onOpen={openSection}
          onCamera={openCamera}
          pins={pins}
          onRemovePin={(id) => setPins((prev) => prev.filter((p) => p.id !== id))}
        />
      </main>
      {open && <FolderWindow section={open} onSelect={setOpen} onClose={close} />}
      {cameraOpen && (
        <CameraWindow onClose={closeCamera} onPin={(src, caption) => setPins((prev) => addPin(prev, src, caption))} />
      )}
    </div>
  )
}