import { motion, useScroll, useSpring } from 'framer-motion'

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[70] bg-lime"
      style={{ scaleX }}
      aria-hidden
    />
  )
}

export default ProgressBar