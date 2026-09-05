import { motion } from 'framer-motion'

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <span className="text-sm font-semibold tracking-widest uppercase text-primary-light">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-white">
        {title}
      </h2>
      <span className="mt-4 block w-16 h-1 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
    </motion.div>
  )
}

export default SectionHeading