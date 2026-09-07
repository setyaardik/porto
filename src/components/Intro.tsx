import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ScrambleText from '../motion/ScrambleText'
import { profile } from '../data'

const THRESHOLDS = [
  { at: 14, line: '> booting portfolio_2026' },
  { at: 40, line: '> importing react · go · django' },
  { at: 66, line: '> compiling styles · loading fonts' },
  { at: 88, line: '> deploy ready' },
]

function Intro({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [showName, setShowName] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return
    }
    const id = setInterval(() => {
      setProgress((p) => Math.min(p + 2.2, 100))
    }, 30)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const t1 = setTimeout(() => setShowName(true), 250)
    const t2 = setTimeout(onDone, 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [progress, onDone])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const visibleLines = THRESHOLDS.filter((t) => progress >= t.at)

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg text-ink flex items-center justify-center cursor-pointer select-none"
      onClick={onDone}
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Memuat portfolio"
    >
      <div className="w-full max-w-sm px-6">
        <p className="mono text-[11px] uppercase text-muted text-center mb-10">
          portfolio · vol. 01 · {new Date().getFullYear()}
        </p>

        {showName ? (
          <h1
            className="text-center font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}
          >
            <ScrambleText text={profile.name.toUpperCase()} />
          </h1>
        ) : (
          <p
            className="text-center font-display font-bold tabular-nums"
            style={{ fontSize: 'clamp(3rem, 10vw, 5rem)' }}
          >
            {Math.round(progress)}
            <span className="text-lime">%</span>
          </p>
        )}

        <div className="mt-8 h-[3px] bg-line rounded-full overflow-hidden">
          <div
            className="h-full bg-lime rounded-full transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-7 min-h-[84px] space-y-1 mono text-xs text-muted">
          {visibleLines.map((t) => (
            <p key={t.line}>
              <span className="text-lime">✓</span> {t.line}
            </p>
          ))}
        </div>

        <p className="mt-6 text-center mono text-[10px] uppercase text-muted/50">
          klik untuk lewati
        </p>
      </div>
    </motion.div>
  )
}

export default Intro