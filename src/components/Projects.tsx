import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa6'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { profile } from '../data'
import Reveal from '../motion/Reveal'
import Tilt from '../motion/Tilt'
import ScrambleText from '../motion/ScrambleText'
import { TECH_ICONS } from '../lib/techIcons'

type Project = (typeof profile.projects)[number]

function Preview({ p }: { p: Project }) {
  const images = (p.images?.length ? p.images : p.image ? [p.image] : []) as string[]
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const idx = images.length ? Math.min(active, images.length - 1) : 0
  const img = images[idx]

  useEffect(() => {
    if (images.length < 2 || hovered) return
    const id = setInterval(() => setActive((a) => (a + 1) % images.length), 3500)
    return () => clearInterval(id)
  }, [images.length, hovered])

  const pick = (e: React.SyntheticEvent, i: number) => {
    e.preventDefault()
    e.stopPropagation()
    setActive(i)
  }

  const prev = (e: React.SyntheticEvent) => pick(e, (idx - 1 + images.length) % images.length)
  const next = (e: React.SyntheticEvent) => pick(e, (idx + 1) % images.length)

  if (!img) {
    return (
      <div className="relative h-52 md:h-56 overflow-hidden border-b border-line bg-gradient-to-b from-surface to-bg grid place-items-center">
        <div className="absolute top-3.5 left-4 flex gap-1.5" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-serif italic text-[6rem] leading-none text-ink/10 select-none" aria-hidden>
          {p.title[0]}
        </span>
        <span className="absolute bottom-3 right-4 mono text-[10px] uppercase text-muted/70">
          preview — coming soon
        </span>
        <span className="absolute top-3.5 right-4 text-lime" aria-hidden>✦</span>
      </div>
    )
  }

  return (
    <div
      className="relative h-60 md:h-72 overflow-hidden border-b border-line bg-ink group/preview"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={img}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110 transition-transform duration-[1200ms] ease-out group-hover:scale-125"
      />

      <div className="relative h-full w-full flex items-center justify-center p-5">
        <AnimatePresence mode="wait">
          <motion.img
            key={img}
            src={img}
            alt={`Screenshot ${p.title}${images.length > 1 ? ` ${idx + 1}` : ''}`}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="max-h-full max-w-full w-auto h-auto object-contain rounded-md border border-line/40 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)] transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        </AnimatePresence>
      </div>

      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-lime/15 to-transparent pointer-events-none"
        aria-hidden
      />
      <span
        className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-lime/80 to-transparent animate-scan"
        aria-hidden
      />
      <span className="absolute bottom-3 left-3 mono text-[10px] uppercase bg-ink/70 border border-lime/40 rounded px-2 py-1 backdrop-blur-md animate-floaty">
        shot {idx + 1}/{images.length}
      </span>

      {images.length > 1 && (
        <>
          <span
            role="button"
            tabIndex={0}
            onClick={prev}
            onKeyDown={(e) => e.key === 'Enter' && prev(e)}
            aria-label="Screenshot sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 grid place-items-center rounded-full bg-ink/70 border border-lime/40 text-lime backdrop-blur-md cursor-pointer hover:bg-lime hover:text-bg transition-colors"
          >
            <ChevronLeft size={16} />
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={next}
            onKeyDown={(e) => e.key === 'Enter' && next(e)}
            aria-label="Screenshot berikutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 grid place-items-center rounded-full bg-ink/70 border border-lime/40 text-lime backdrop-blur-md cursor-pointer hover:bg-lime hover:text-bg transition-colors"
          >
            <ChevronRight size={16} />
          </span>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute top-3 right-3 z-20 flex gap-1.5">
          {images.map((im, i) => (
            <span
              key={im}
              role="button"
              tabIndex={0}
              onClick={(e) => pick(e, i)}
              onKeyDown={(e) => e.key === 'Enter' && pick(e, i)}
              aria-label={`Lihat screenshot ${i + 1}`}
              className={`block h-8 w-12 rounded border cursor-pointer transition-all duration-300 ${
                i === idx ? 'border-lime scale-110 shadow-[0_0_12px_rgba(186,255,58,0.4)]' : 'border-white/30 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundImage: `url(${im})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-3">
            <Reveal className="mono text-xs uppercase text-muted sticky top-24">
              <span className="text-lime">03</span> / karya
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <div className="space-y-6">
              {profile.projects.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <Tilt max={6}>
                    <div className="card-d overflow-hidden group">
                      <Preview p={p} />

                      <div className="p-6 md:p-7 flex flex-col md:flex-row md:items-start gap-5">
                        <span className="mono text-xs text-muted shrink-0 pt-1">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-display text-2xl font-bold group-hover:text-lime transition-colors">
                              <ScrambleText text={p.title} hoverFlicker />
                            </h3>
                            <div className="flex gap-3 shrink-0">
                              {p.demo && (
                                <a
                                  href={p.demo}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label="Live demo"
                                  className="w-9 h-9 grid place-items-center rounded-full border border-line text-muted hover:text-lime hover:border-lime/60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                >
                                  <ArrowUpRight size={17} />
                                </a>
                              )}
                              <a
                                href={p.github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Source code"
                                className="w-9 h-9 grid place-items-center rounded-full border border-line text-muted hover:text-lime hover:border-lime/60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              >
                                <FaGithub size={16} />
                              </a>
                            </div>
                          </div>

                          <p className="mt-3 text-sm text-muted leading-relaxed max-w-2xl">
                            {p.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {p.tech.map((t) => {
                              const Icon = TECH_ICONS[t]
                              return (
                                <span
                                  key={t}
                                  className="mono text-[11px] uppercase px-2.5 py-1.5 rounded-md border border-line text-ink/70 flex items-center gap-1.5"
                                >
                                  {Icon && <Icon size={12} className="text-lime" />}
                                  {t}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects