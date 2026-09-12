import { Github, Star } from 'lucide-react'

export default function Topbar({ total, username }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-panel">
            <Github size={18} className="text-zinc-300" />
            <div className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100"
                 style={{ background: 'radial-gradient(circle at center, rgba(232,244,248,0.08) 0%, transparent 70%)' }} />
          </div>

          <div>
            <h1 className="font-display text-sm font-medium tracking-widest text-zinc-200 uppercase">
              Stars Browser
            </h1>
            {username && (
              <p className="font-display text-xs text-zinc-600 tracking-wider">
                @{username}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-panel px-4 py-2">
          <Star size={13} className="text-zinc-500" />
          <span className="font-display text-xs text-zinc-400 tracking-widest">{total} repos</span>
        </div>
      </div>
    </header>
  )
}
