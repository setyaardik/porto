import { Award, ArrowUpRight } from 'lucide-react'
import { profile } from '../data'
import Reveal from '../motion/Reveal'
import Tilt from '../motion/Tilt'
import ScrambleText from '../motion/ScrambleText'

function Certificates() {
  return (
    <section id="sertifikat" className="py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-3">
            <Reveal className="mono text-xs uppercase text-muted sticky top-24">
              <span className="text-lime">05</span> / sertifikat
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <div className="grid sm:grid-cols-2 gap-6">
              {profile.certificates.map((c: any, i: number) => (
                <Reveal key={c.title} delay={i * 0.1}>
                  <Tilt max={6}>
                    <a
                      href={c.file}
                      target="_blank"
                      rel="noreferrer"
                      className="card-d overflow-hidden group block relative hover:shadow-[0_20px_60px_-25px_rgba(186,255,58,0.35)] transition-shadow duration-500"
                    >
                      <span
                        className="absolute -inset-1 bg-lime/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none"
                        aria-hidden
                      />

                      <div className="relative h-52 overflow-hidden border-b border-line">
                        <img
                          src={c.preview}
                          alt={`Halaman pertama ${c.title}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-110"
                        />

                        <span
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-lime/15 to-transparent pointer-events-none"
                          aria-hidden
                        />
                        <span
                          className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-lime/80 to-transparent animate-scan"
                          aria-hidden
                        />

                        <span className="absolute bottom-3 left-3 mono text-[10px] uppercase text-lime bg-ink/70 border border-lime/40 rounded px-2 py-1 backdrop-blur-md animate-floaty">
                          page 1
                        </span>
                      </div>

                      <div className="p-6 flex items-start gap-5">
                        <span className="relative shrink-0 w-11 h-11 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center text-lime group-hover:bg-lime group-hover:text-bg transition-all duration-300">
                          <span
                            className="absolute inset-0 rounded-xl border border-lime/50 animate-pulse-dot"
                            aria-hidden
                          />
                          <Award size={20} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="group-hover:text-lime transition-colors">
                            <ScrambleText
                              text={c.title}
                              hoverFlicker
                              className="font-display font-bold text-lg leading-snug"
                            />
                          </h3>
                          <p className="text-sm text-muted mt-1">{c.issuer}</p>
                          <span className="mono text-[10px] uppercase text-lime bg-lime/10 border border-lime/30 rounded px-2 py-0.5 mt-3 inline-block">
                            {c.year}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-line px-6 py-3 flex justify-between items-center text-xs text-muted mono">
                        <span>{c.file.split('/').pop()}</span>
                        <span className="group-hover:text-lime transition-colors flex items-center gap-1">
                          buka
                          <ArrowUpRight
                            size={14}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </span>
                      </div>
                    </a>
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

export default Certificates