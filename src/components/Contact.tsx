import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { profile } from '../data'
import Reveal from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'
import { scrollToId } from '../lib/lenis'

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    scrollToId(href)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!profile.formEndpoint) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (res.ok) {
        form.reset()
        setStatus('ok')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputBase =
    'w-full py-3 px-4 bg-surface border border-line text-ink text-sm placeholder:text-muted/50 focus:outline-none focus:border-lime transition-colors'

  return (
    <section id="contact" className="py-24 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-3">
            <Reveal className="mono text-xs uppercase text-muted sticky top-24">
              <span className="text-lime">05</span> / kontak
            </Reveal>
          </div>

          <div className="lg:col-span-9 lg:max-w-2xl">
            <Reveal>
<h2 className="font-display font-bold tracking-tight leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Ada ide atau proyek yang seru?{' '}
                <span className="text-lime">Kirim pesan</span> — saya bakal bales{' '}
                <span className="mono text-base">&lt; 48 jam.</span>
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
              <form onSubmit={handleSubmit} className="mt-12 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="sr-only">Nama</label>
                    <input id="name" name="name" type="text" required placeholder="nama" className={inputBase} />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input id="email" name="email" type="email" required placeholder="email" className={inputBase} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">Pesan</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="ceritakan kebutuhanmu..."
                    className={`${inputBase} resize-none`}
                  />
                </div>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 rounded-full bg-lime text-bg px-7 py-3.5 text-sm font-semibold hover:bg-ink hover:text-lime transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'mengirim...' : 'kirim_pesan() →'}
                  </button>
                </Magnetic>

                {status === 'ok' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mono text-xs text-lime"
                    role="status"
                  >
                    ✓ terkirim — makasih, saya bales secepatnya.
                  </motion.p>
                )}

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mono text-xs text-[#ff5f57]"
                    role="alert"
                  >
                    ✗ gagal terkirim — coba lagi atau email langsung ke {profile.email}.
                  </motion.p>
                )}
              </form>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-14 pt-8 border-t border-line flex flex-wrap items-center gap-x-8 gap-y-4 mono text-xs text-muted">
                <a href={`mailto:${profile.email}`} className="hover:text-lime transition-colors">
                  {profile.email}
                </a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="hover:text-lime transition-colors">
                  {profile.phone}
                </a>
                <a href="#home" onClick={(e) => go(e, '#home')} className="hover:text-lime transition-colors">
                  back_to_top()
                </a>
                <span className="flex items-center gap-4">
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
                      className="hover:text-lime transition-colors"
                    >
                      {s.icon}
                    </a>
                  ))}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact