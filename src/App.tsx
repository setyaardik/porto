import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProgressBar from './components/ProgressBar'
import Particles from './motion/Particles'
import Cursor from './motion/Cursor'
import { initLenis, destroyLenis } from './lib/lenis'

function App() {
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    initLenis()
    console.log(
      '%cguys, kamu nemu bonus tab dari website ini. mau tahu gimana dibangunnya?',
      'color:#baff3a;font-size:14px;font-weight:bold;font-family:monospace',
    )
    console.log(
      '%creact + typescript + framer-motion + canvas particles. all hand-coded.',
      'color:#8f8d87;font-family:monospace',
    )
    return () => destroyLenis()
  }, [])

  return (
    <div className="relative min-h-screen bg-bg text-ink font-body overflow-x-hidden">
      <ProgressBar />
      <Particles />
      <Cursor />

      {!intro && (
        <>
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Timeline />
            <Certificates />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      <AnimatePresence>
        {intro && <Intro onDone={() => setIntro(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default App