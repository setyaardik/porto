import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '!<>-_\\/[]{}—=+*^?#0123456789'

function randomOut(text: string) {
  let out = ''
  for (let i = 0; i < text.length; i++) {
    out += text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return out
}

function ScrambleText({
  text,
  className,
  speed = 28,
  hoverFlicker = false,
}: {
  text: string
  className?: string
  speed?: number
  hoverFlicker?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const [display, setDisplay] = useState('')
  const [flickering, setFlickering] = useState(false)

  useEffect(() => {
    if (!inView || flickering) return
    let frame = 0
    let raf = 0
    const total = Math.min(40, text.length * 2)

    const update = () => {
      frame++
      const progress = frame / total
      const revealed = Math.floor(progress * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        out += text[i] === ' ' ? ' ' : i < revealed ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
      }
      setDisplay(out)
      if (progress < 1) raf = window.setTimeout(update, speed)
    }
    raf = window.setTimeout(update, 100)

    return () => clearTimeout(raf)
  }, [inView, text, speed, flickering])

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current)
  }, [])

  const stopFlicker = () => {
    if (timer.current) clearInterval(timer.current)
    setFlickering(false)
    setDisplay(text)
  }

  const startFlicker = () => {
    if (!hoverFlicker || !inView) return
    if (timer.current) clearInterval(timer.current)
    setFlickering(true)
    timer.current = setInterval(() => setDisplay(randomOut(text)), 55)
  }

  return (
    <span
      ref={ref}
      onMouseEnter={startFlicker}
      onMouseLeave={stopFlicker}
      className={className}
      aria-label={text}
    >
      {display}
    </span>
  )
}

export default ScrambleText