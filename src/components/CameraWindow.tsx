import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { cropSquare, makeThumb, renderPolaroidPng } from '../lib/pins'

type Props = { onClose: () => void; onPin: (src: string, caption: string) => void }
type Photo = { id: number; src: string }

export default function CameraWindow({ onClose, onPin }: Props) {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const mounted = useRef(true)
  const readyTimer = useRef<number | undefined>(undefined)

  const [on, setOn] = useState(false)
  const [denied, setDenied] = useState(false)
  const [flash, setFlash] = useState(false)
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [ready, setReady] = useState(false)
  const [caption, setCaption] = useState('')
  const [busy, setBusy] = useState(false)

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((tr) => tr.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setOn(false)
  }, [])

  // foco, rolagem travada e desligamento do stream ao desmontar
  useEffect(() => {
    mounted.current = true
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      mounted.current = false
      window.clearTimeout(readyTimer.current)
      streamRef.current?.getTracks().forEach((tr) => tr.stop())
      streamRef.current = null
      document.body.style.overflow = ''
    }
  }, [])

  const startCamera = async () => {
    setDenied(false)
    if (!navigator.mediaDevices?.getUserMedia) { setDenied(true); return }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      if (!mounted.current) { stream.getTracks().forEach((tr) => tr.stop()); return }
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => undefined)
      }
      setOn(true)
    } catch {
      setDenied(true)
    }
  }

  const newPhoto = (src: string) => {
    window.clearTimeout(readyTimer.current)
    setPhoto({ id: Date.now(), src })
    setCaption('')
    setReady(false)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    readyTimer.current = window.setTimeout(() => setReady(true), reduced ? 0 : 6300)
  }

  const shoot = () => {
    const v = videoRef.current
    if (!on || !v) { fileRef.current?.click(); return }
    if (!v.videoWidth) return
    setFlash(true)
    window.setTimeout(() => setFlash(false), 280)
    newPhoto(cropSquare(v, v.videoWidth, v.videoHeight, true)) // espelhada, igual ao visor
  }

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      newPhoto(cropSquare(img, img.naturalWidth, img.naturalHeight, false))
      URL.revokeObjectURL(url)
    }
    img.onerror = () => URL.revokeObjectURL(url)
    img.src = url
  }

  const download = async () => {
    if (!photo) return
    setBusy(true)
    try {
      const href = await renderPolaroidPng(photo.src, caption)
      const a = document.createElement('a')
      a.href = href
      a.download = 'polaroid.png'
      a.click()
    } finally { setBusy(false) }
  }

  const pin = async () => {
    if (!photo) return
    setBusy(true)
    try {
      const thumb = await makeThumb(photo.src)
      stopCamera()
      onPin(thumb, caption.trim())
      onClose()
    } finally { setBusy(false) }
  }

  const again = () => {
    window.clearTimeout(readyTimer.current)
    setPhoto(null); setReady(false); setCaption('')
  }

  return (
    <div className="overlay cam-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cam-window" role="dialog" aria-modal="true" aria-label={t('camera.title')}>
        <button ref={closeRef} className="close cam-close" onClick={onClose} aria-label={t('camera.close')}>×</button>

        <div className="cam-left">
          <div className="cam-body">
            <div className="cam-stripe" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="cam-top" aria-hidden="true"><span className="cam-lens" /><span className="cam-flash-win" /></div>

            <div className="viewfinder" role="group" aria-label={t('camera.viewfinder')}>
              <video ref={videoRef} className={'vf-video' + (on ? ' is-on' : '')} playsInline muted autoPlay />
              {!on && (
                <div className="vf-off">
                  <button className="btn btn-primary" onClick={startCamera} aria-label={t('camera.turnOn')}>
                    {t('camera.turnOn')}
                  </button>
                  {denied && <p className="vf-err" role="alert">{t('camera.denied')}</p>}
                </div>
              )}
              {flash && <span className="vf-flash" aria-hidden="true" />}
            </div>

            <div className="cam-controls">
              <button className="btn btn-ghost btn-sm" onClick={() => fileRef.current?.click()} aria-label={t('camera.attach')}>
                {t('camera.attach')}
              </button>
              <button className="shutter" onClick={shoot} aria-label={t('camera.shutter')} />
              {on ? (
                <button className="btn btn-ghost btn-sm" onClick={stopCamera} aria-label={t('camera.turnOff')}>
                  {t('camera.turnOff')}
                </button>
              ) : <span className="cam-spacer" />}
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
            <span className="cam-slit" aria-hidden="true" />
          </div>

          <div className={'pol-slot' + (photo ? ' has-photo' : '')}>
            {photo && (
              <figure className="pol" key={photo.id}>
                <div className="pol-photo">
                  <img src={photo.src} alt={t('camera.polaroidAlt')} />
                </div>
                <input
                  className="pol-caption"
                  value={caption}
                  maxLength={28}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={t('camera.captionPlaceholder')}
                  aria-label={t('camera.captionLabel')}
                />
              </figure>
            )}
          </div>
        </div>

        <div className="cam-right">
          <h2>{t('camera.title')}</h2>
          <p className="lead">{t('camera.desc')}</p>

          {photo && !ready && <p className="developing" role="status">{t('camera.revealing')}</p>}

          {photo && ready && (
            <div className="cam-actions">
              <button className="btn btn-primary" onClick={download} disabled={busy} aria-label={t('camera.download')}>
                {t('camera.download')}
              </button>
              <button className="btn btn-ghost" onClick={pin} disabled={busy} aria-label={t('camera.pin')}>
                {t('camera.pin')}
              </button>
              <button className="btn btn-ghost" onClick={again} aria-label={t('camera.again')}>
                {t('camera.again')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}