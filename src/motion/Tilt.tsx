import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function Tilt({
  children,
  className,
  max = 9,
}: {
  children: React.ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 18 })
  const rotY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    px.set(cx / rect.width)
    py.set(cy / rect.height)
    ref.current?.style.setProperty('--gx', `${(cx / rect.width) * 100}%`)
    ref.current?.style.setProperty('--gy', `${(cy / rect.height) * 100}%`)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={className}
      data-tilt
    >
      {children}
      <div
        aria-hidden
        className="absolute inset-0 z-10 rounded-inherit pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(320px circle at var(--gx, 50%) var(--gy, 50%), rgba(186,255,58,0.14), transparent 60%)',
        }}
      />
    </motion.div>
  )
}

export default Tilt