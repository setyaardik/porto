import { useEffect, useRef } from 'react'

type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -999, y: -999 }
    let parts: P[] = []

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.floor(w / 20))
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.5,
        a: Math.random() * 0.35 + 0.12,
      }))
    }

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 130) {
          p.x += (dx / d) * 0.5
          p.y += (dy / d) * 0.5
        }
        p.x += p.vx
        p.y += p.vy
        if (p.y > h + 4) {
          p.y = -4
          p.x = Math.random() * w
        }
        if (p.x > w + 4) p.x = -4
        if (p.x < -4) p.x = w + 4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(186,255,58,${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden />
}

export default Particles