import { ExternalLink, GitFork, Star, Clock } from 'lucide-react'
import { getRepoImage, formatNumber, timeAgo } from '../lib/github'

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Shell: '#89e051',
  C: '#555555',
  'C++': '#f34b7d',
  Ruby: '#701516',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Nix: '#7e7eff',
}

export default function RepoCard({ repo, index = 0, view = 'grid' }) {
  const imgSrc = getRepoImage(repo)
  const langColor = LANG_COLORS[repo.language] ?? '#52525b'

  if (view === 'list') {
    return (
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="card-enter group flex items-center gap-4 rounded-xl border border-border bg-panel px-4 py-3 transition-all duration-200 hover:border-zinc-700"
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <span
          className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
          style={{ background: langColor }}
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-sm font-medium tracking-wide text-zinc-100">
            {repo.full_name}
          </h2>
          <p className="truncate font-body text-xs text-zinc-500">
            {repo.description || 'No description available'}
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-4 text-zinc-600">
          <div className="flex items-center gap-1.5">
            <Star size={12} />
            <span className="font-display text-xs tracking-wider">{formatNumber(repo.stargazers_count)}</span>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <GitFork size={12} />
            <span className="font-display text-xs tracking-wider">{formatNumber(repo.forks_count)}</span>
          </div>
          <div className="hidden items-center gap-1.5 md:flex">
            <Clock size={12} />
            <span className="font-display text-xs tracking-wider">{timeAgo(repo.updated_at)}</span>
          </div>
          <ExternalLink
            size={13}
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </div>
      </a>
    )
  }

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="card-enter group relative overflow-hidden rounded-2xl border border-border bg-panel transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-2xl noise-bg"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-zinc-950">
        <img
          src={imgSrc}
          alt={repo.full_name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        {/* Bottom gradient to blend into card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/20 to-transparent" />

        {/* Language badge — top-right overlay on image */}
        {repo.language && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 backdrop-blur-sm">
            <span
              className="h-2 w-2 rounded-full flex-shrink-0"
              style={{ background: langColor }}
            />
            <span className="font-display text-[10px] text-zinc-300 tracking-wide">
              {repo.language}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="space-y-3 p-5">
        {/* Repo name */}
        <div>
          <h2 className="line-clamp-1 font-display text-sm font-medium tracking-wide text-zinc-100">
            {repo.full_name}
          </h2>
          <p className="mt-1.5 line-clamp-2 font-body text-xs leading-relaxed text-zinc-500">
            {repo.description || 'No description available'}
          </p>
        </div>

        {/* Topics */}
        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-border bg-black px-2.5 py-0.5 font-display text-[10px] text-zinc-500 tracking-wide"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 4 && (
              <span className="font-display text-[10px] text-zinc-700 self-center tracking-wide">
                +{repo.topics.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer stats */}
        <div className="flex items-center justify-between border-t border-border pt-3 text-zinc-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star size={12} />
              <span className="font-display text-xs tracking-wider">{formatNumber(repo.stargazers_count)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork size={12} />
              <span className="font-display text-xs tracking-wider">{formatNumber(repo.forks_count)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} />
              <span className="font-display text-xs tracking-wider">{timeAgo(repo.updated_at)}</span>
            </div>
          </div>

          <ExternalLink
            size={13}
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </div>
      </div>
    </a>
  )
}
