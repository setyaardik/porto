import { useState } from 'react'
import { navLinks, profile } from '../data'
import { scrollToId } from '../lib/lenis'
import Magnetic from '../motion/Magnetic'

function Navbar() {
  const [open, setOpen] = useState(false)

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between h-16">
        <a href="#home" onClick={(e) => go(e, '#home')} className="mono font-bold text-lg tracking-tight">
          {profile.shortName}
          <span className="text-lime">_</span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="mono text-xs uppercase text-muted hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => go(e, '#contact')}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-lime/60 text-lime px-4 py-2 text-xs font-semibold hover:bg-lime hover:text-bg transition-colors"
            >
              say_hi()
            </a>
          </Magnetic>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="md:hidden mono text-xs text-ink uppercase"
          >
            {open ? 'close' : 'menu'}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="md:hidden border-t border-line bg-bg px-5 py-4 space-y-3">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="mono text-sm text-ink/80 hover:text-lime transition-colors block"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar