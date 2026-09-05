import { FaGithub } from 'react-icons/fa6'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data'
import Reveal from '../motion/Reveal'
import Tilt from '../motion/Tilt'
import ScrambleText from '../motion/ScrambleText'
import { TECH_ICONS } from '../lib/techIcons'

type Project = (typeof profile.projects)[number]

function Preview({ p }: { p: Project }) {
  if (p.image) {
    return (
      <div className="relative h-52 md:h-56 overflow-hidden border-b border-line">
        <img
          src={p.image}
          alt={`Screenshot ${p.title}`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    )
  }

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