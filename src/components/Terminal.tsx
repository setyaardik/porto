import { useEffect, useMemo, useState } from 'react'
import { profile } from '../data'

const ROWS = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: profile.name + ' — fullstack developer' },
  { type: 'cmd', text: 'stack --list' },
  { type: 'out', text: 'react · next · go · django · laravel · flutter · postgres · mysql' },
  { type: 'cmd', text: 'git status' },
  { type: 'out', text: 'currently building web apps, learning new things' },
  { type: 'cmd', text: 'ping anyone' },
  { type: 'out', text: 'always happy to talk code, ideas, collabs' },
]

function Terminal() {
  const [done, setDone] = useState(0)

  const flatLen = useMemo(() => ROWS.reduce((s, r) => s + r.text.length + 1, 0), [])

  useEffect(() => {
    let count = 0
    const id = setInterval(() => {
      count++
      setDone(count)
      if (count >= flatLen) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [flatLen])

  let cursor = 0

  return (
    <div className="card-d overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="mono text-xs text-muted ml-3">~/portfolio — bash</span>
      </div>

      <div className="mono text-[13px] leading-[1.75] p-5 min-h-[320px]">
        {ROWS.map((row, i) => {
          const local = done - cursor
          cursor += row.text.length + 1
          if (local <= 0) return null
          const shown = Math.min(local, row.text.length)
          const text = row.text.slice(0, shown)

          return (
            <p key={i}>
              {row.type === 'cmd' ? (
                <>
                  <span className="text-lime">$</span> <span className="text-ink">{text}</span>
                </>
              ) : (
                <span className="text-ink/60">{text}</span>
              )}
            </p>
          )
        })}

        <p className="flex items-center gap-1.5 pt-1">
          <span className="text-lime">$</span>
          <span className="w-2 h-4 bg-lime animate-blink inline-block" />
        </p>
      </div>
    </div>
  )
}

export default Terminal