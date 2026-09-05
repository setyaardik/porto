import { motion } from 'framer-motion'

function SectionTitle({ no, eyebrow, title }: { no: string; eyebrow: string; title: React.ReactNode }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <p className="eyebrow text-muted">
        <span className="text-brand">{no}</span> / {eyebrow}
      </p>
      <h2
        className="mt-5 font-display font-bold tracking-tight text-ink"
        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
      >
        {title}
      </h2>
    </motion.header>
  )
}

export default SectionTitle