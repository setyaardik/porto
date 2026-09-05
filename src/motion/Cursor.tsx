import { useEffect, useState, useRef } from 'react'

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)

    const dot = dotRef.current!
    const ring = ringRef.current!
    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      const target = e.target as HTMLElement
      const interactive = !!target.closest('a, button, input, textarea, [data-tilt]')
      ring.classList.toggle('cursor-scale', interactive)
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="hidden md:block" aria-hidden>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-lime pointer-events-none z-[80]" />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-lime/60 pointer-events-none z-[80] cursor-scale transition-transform duration-200"
      />
    </div>
  )
}

export default Cursor