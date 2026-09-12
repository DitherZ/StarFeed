import RepoCard from './RepoCard'

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-panel">
      <div className="aspect-video skeleton" />
      <div className="space-y-3 p-5">
        <div className="space-y-2">
          <div className="skeleton h-3.5 w-2/3 rounded-full" />
          <div className="skeleton h-3 w-full rounded-full" />
          <div className="skeleton h-3 w-3/4 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-12 rounded-full" />
          <div className="skeleton h-5 w-20 rounded-full" />
        </div>
        <div className="border-t border-border pt-3 flex gap-4">
          <div className="skeleton h-3 w-10 rounded-full" />
          <div className="skeleton h-3 w-10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function RepoGrid({ repos, loading, view = 'grid' }) {
  const layoutClass = view === 'list' ? 'flex flex-col gap-3' : 'grid grid-cols-1 gap-5 md:grid-cols-2'

  if (loading) {
    return (
      <div className={layoutClass}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={layoutClass}>
      {repos.map((repo, i) => (
        <RepoCard key={repo.id} repo={repo} index={i} view={view} />
      ))}
    </div>
  )
}
