import { motion, useScroll, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { profile } from '../data'
import Terminal from './Terminal'
import ScrambleText from '../motion/ScrambleText'
import Magnetic from '../motion/Magnetic'
import Tilt from '../motion/Tilt'
import { scrollToId } from '../lib/lenis'

function Hero() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, -80])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2])

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    scrollToId(href)
  }

  return (
    <section id="home" className="relative pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="absolute inset-0 grid-lines" aria-hidden />
      <div className="absolute inset-0 vignette" aria-hidden />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative max-w-6xl mx-auto px-5 md:px-6"
      >
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mono text-xs uppercase text-muted flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse-dot" />
              &gt; [ fullstack developer — {profile.location} ]
            </motion.div>

            <h1 className="mt-8 font-display font-bold tracking-tight leading-[1.02]">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="block"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}
              >
                BUILDING THE WEB
              </motion.span>
              <span
                className="block text-lime"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}
              >
                <ScrambleText text="ONE INTERFACE" />
              </span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="block"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}
              >
                AT A TIME<span className="text-lime">.</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-7 max-w-md text-[15px] text-muted leading-relaxed"
            >
              {profile.summary.split('.')[0]}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => go(e, '#projects')}
                  className="inline-flex items-center gap-3 rounded-full bg-ink text-bg px-6 py-3.5 text-sm font-semibold hover:bg-lime transition-colors"
                >
                  lihat_karya() →
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium hover:border-lime/60 hover:text-lime transition-colors"
                >
                  {profile.email}
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-10 flex items-center gap-5 mono text-xs text-muted"
            >
              <span className="uppercase">
                {profile.location} <span className="text-lime">/</span> web developer
              </span>
              <span className="flex items-center gap-3">
                {[
                  { icon: <FaGithub size={15} />, href: profile.github, label: 'GitHub' },
                  { icon: <FaLinkedin size={15} />, href: profile.linkedin, label: 'LinkedIn' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="text-muted hover:text-lime transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-lime/5 blur-3xl rounded-full" aria-hidden />
            <Tilt className="relative">
              <Terminal />
            </Tilt>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative mt-24 border-y border-line overflow-hidden select-none" aria-hidden>
        <div className="flex whitespace-nowrap w-max animate-marquee py-4 hover:[animation-play-state:paused]">
          {[...profile.marquee, ...profile.marquee].map((t, i) => (
            <span key={i} className="mono text-sm uppercase text-muted flex items-center">
              <span className="mx-6">{t}</span>
              <span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero