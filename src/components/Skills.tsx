import { motion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import { TECH_ICONS } from '../lib/techIcons'

const groups = [
  { label: 'frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'Flutter'] },
  { label: 'backend', items: ['Node.js', 'Go', 'Django', 'PostgreSQL', 'MySQL', 'Prisma'] },
  { label: 'tools', items: ['GitHub', 'Docker', 'Figma', 'Redux', 'REST API', 'JWT Auth'] },
]

function TechItem({ name, isLast }: { name: string; isLast: boolean }) {
  const Icon = TECH_ICONS[name]

  return (
    <span className="inline-flex items-center gap-2 group/tech cursor-default">
      <span className="text-muted/70 transition-colors group-hover/tech:text-lime flex">
        {Icon && <Icon size={15} />}
      </span>
      <span className="text-ink/90 text-lg transition-colors group-hover/tech:text-lime">{name}</span>
      {!isLast && <span className="text-muted mx-2">/</span>}
    </span>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-3">
            <Reveal className="mono text-xs uppercase text-muted sticky top-24">
              <span className="text-lime">02</span> / keahlian
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <div className="space-y-8">
              {groups.map((g, i) => (
                <Reveal key={g.label} delay={i * 0.1}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 border-b border-line pb-6">
                    <span className="mono text-xs uppercase text-lime sm:w-28 shrink-0">{g.label}</span>
                    <div className="flex flex-wrap items-center">
                      {g.items.map((it, j) => (
                        <TechItem key={it} name={it} isLast={j === g.items.length - 1} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-8 mono text-xs text-muted"
              >
                <span className="text-lime">+ learning:</span> next.js, docker deploy, postgres & mysql query perf
              </motion.p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills