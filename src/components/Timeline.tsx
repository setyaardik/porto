import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../data'
import Reveal from '../motion/Reveal'

type Item = { title: string; subtitle: string; period: string }

function Chronology({ items, title }: { items: Item[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })

  return (
    <div>
      <Reveal className="mono text-xs uppercase text-muted mb-6">{title}</Reveal>
      <div ref={ref} className="relative space-y-6">
        <motion.span
          className="absolute left-0 top-2 bottom-2 w-[2px] bg-lime origin-top"
          style={{ scaleY }}
          aria-hidden
        />
        {items.map((item, i) => (
          <Reveal key={item.title + item.period} delay={i * 0.06}>
            <div className="pl-5 relative">
              <motion.span
                className="absolute -left-[5px] top-1.5 w-3 h-3 rounded-full bg-lime ring-4 ring-lime/20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
              />
              <p className="mono text-xs text-lime mb-1">{item.period}</p>
              <p className="font-display font-semibold text-lg">{item.title}</p>
              <p className="text-sm text-muted mt-0.5">{item.subtitle}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function Timeline() {
  return (
    <section id="experience" className="py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-3">
            <Reveal className="mono text-xs uppercase text-muted sticky top-24">
              <span className="text-lime">04</span> / perjalanan
            </Reveal>
          </div>

          <div className="lg:col-span-9 grid md:grid-cols-2 gap-12">
            <Chronology
              title="pengalaman"
              items={profile.experience.map((e) => ({
                title: e.role,
                subtitle: e.company,
                period: e.period,
              }))}
            />
            <Chronology
              title="pendidikan"
              items={profile.education.map((e) => ({
                title: e.degree,
                subtitle: e.school,
                period: e.period,
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline