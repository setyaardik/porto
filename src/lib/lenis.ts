import Lenis from 'lenis'

let lenis: Lenis | null = null

export function initLenis() {
  if (lenis) return lenis
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  const loop = (time: number) => {
    lenis?.raf(time)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
  return lenis
}

export function scrollToId(id: string) {
  const target = document.querySelector(id)
  if (!target) return
  if (lenis) {
    lenis.scrollTo(id, { offset: -72 })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}