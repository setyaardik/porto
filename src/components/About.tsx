import { motion } from 'framer-motion'
import { profile } from '../data'
import Reveal from '../motion/Reveal'
import CountUp from '../motion/CountUp'
import ScrambleText from '../motion/ScrambleText'
import Tilt from '../motion/Tilt'

const stats = [
  { to: 8, suffix: '+', label: 'proyek' },
  { to: 10, suffix: '+', label: 'teknologi' },
]

function About() {
  return (
    <section id="about" className="py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-3">
            <Reveal className="mono text-xs uppercase text-muted sticky top-24">
              <span className="text-lime">01</span> / tentang
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-start">
<Reveal className="md:col-span-2" y={20}>
                <Tilt max={5}>
                  <div className="relative rounded-[1.35rem] p-[2px] overflow-hidden">
                    <div
                      className="absolute inset-[-100%] animate-spin-slower bg-[conic-gradient(from_0deg,transparent_0deg,rgba(186,255,58,0.95)_18deg,transparent_40deg,transparent_160deg,rgba(255,255,255,0.4)_178deg,transparent_200deg,transparent_340deg,rgba(186,255,58,0.5)_358deg)]"
                      aria-hidden
                    />
                    <figure className="relative rounded-[calc(1.35rem-2px)] overflow-hidden bg-surface">
                      <div className="overflow-hidden">
                        <img
                          src="/photo.png"
                          alt={`Foto ${profile.name}`}
                          loading="lazy"
                          style={{ aspectRatio: '3 / 4' }}
                          className="w-full h-auto object-cover"
                        />
                      </div>

                      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lime/80 to-transparent animate-scan" aria-hidden />

                      <span className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-lime pointer-events-none" aria-hidden />
                      <span className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-lime pointer-events-none" aria-hidden />
                      <span className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-lime pointer-events-none" aria-hidden />
                      <span className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-lime pointer-events-none" aria-hidden />

                      <span className="absolute bottom-3 right-3 mono text-[10px] uppercase bg-ink/80 text-lime border border-lime/40 rounded-md px-2.5 py-1 backdrop-blur-md animate-floaty">
                        base: tegal
                      </span>
                    </figure>
                  </div>
                </Tilt>

                <div className="mt-4 flex items-center justify-between">
                  <span className="mono text-[11px] uppercase text-muted">profil — 3:4</span>
                  <span className="mono text-[11px] text-lime">
                    {profile.shortName[0]}.{profile.name.split(' ')[1][0]}.
                  </span>
                </div>
              </Reveal>

              <div className="md:col-span-3">
                <Reveal>
                  <h2 className="font-display font-bold tracking-tight leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                    Saya bikin web yang <ScrambleText text="berguna" />, bukan cuma
                    yang keren di mata.
                  </h2>
                  <motion.span
                    className="block mt-5 h-[3px] w-24 bg-lime origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                  />
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-8 text-[15px] text-muted leading-loose">
                    {profile.summary}
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-12 grid grid-cols-2 gap-6 max-w-xs">
                    {stats.map((s) => (
                      <div key={s.label}>
                        <p className="font-display text-4xl font-bold text-lime">
                          <CountUp to={s.to} suffix={s.suffix} />
                        </p>
                        <p className="mono text-[11px] uppercase text-muted mt-2">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About