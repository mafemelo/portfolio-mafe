export type Pin = { id: string; slot: number; src: string; caption: string }

// Posições fixas (centro em %, rotação em graus) que não cobrem pastas, título nem post-it
export const SLOTS = [
  { x: 26, y: 5, r: -5 },
  { x: 37, y: 10, r: 3 },
  { x: 63, y: 10, r: -3 },
  { x: 74, y: 5, r: 5 },
  { x: 28, y: 64, r: 4 },
  { x: 72, y: 64, r: -4 },
]
export const MAX_PINS = SLOTS.length
const KEY = 'mafe-pins'

export function loadPins(): Pin[] {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]')
    if (!Array.isArray(arr)) return []
    return arr
      .filter((p) => p && typeof p.src === 'string' && typeof p.slot === 'number' && p.slot >= 0 && p.slot < MAX_PINS)
      .map((p) => ({ id: String(p.id), slot: p.slot, src: p.src, caption: String(p.caption ?? '').slice(0, 28) }))
      .slice(-MAX_PINS)
  } catch {
    return []
  }
}

export function savePins(pins: Pin[]) {
  try { localStorage.setItem(KEY, JSON.stringify(pins)) } catch { /* sem espaço: ignora */ }
}

export function addPin(prev: Pin[], src: string, caption: string): Pin[] {
  const next = [...prev]
  const used = new Set(next.map((p) => p.slot))
  let slot = SLOTS.findIndex((_, i) => !used.has(i))
  if (slot === -1) slot = next.shift()!.slot // cheio: a mais antiga sai e libera a posição
  return [...next, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, slot, src, caption }]
}

/* ---------- imagens ---------- */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Recorte central quadrado (720px, JPEG)
export function cropSquare(source: CanvasImageSource, w: number, h: number, mirror: boolean, size = 720, quality = 0.9) {
  const s = Math.min(w, h)
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  if (mirror) { ctx.translate(size, 0); ctx.scale(-1, 1) }
  ctx.drawImage(source, (w - s) / 2, (h - s) / 2, s, s, 0, 0, size, size)
  return c.toDataURL('image/jpeg', quality)
}

export async function makeThumb(src: string) {
  const img = await loadImage(src)
  return cropSquare(img, img.naturalWidth, img.naturalHeight, false, 240, 0.8)
}

// PNG 640x780: moldura branca + foto + legenda
export async function renderPolaroidPng(src: string, caption: string) {
  const img = await loadImage(src)
  const c = document.createElement('canvas')
  c.width = 640; c.height = 780
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 640, 780)
  ctx.drawImage(img, 40, 40, 560, 560)
  if (caption.trim()) {
    ctx.fillStyle = '#24222b'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '600 32px "Hanken Grotesk", Arial, sans-serif'
    ctx.fillText(caption.trim(), 320, 690, 560)
  }
  return c.toDataURL('image/png')
}