import { useEffect, useMemo, useState } from 'react'
import RepoGrid from './components/RepoGrid'
import SearchBar from './components/SearchBar'
import Topbar from './components/Topbar'
import { fetchAllStarredRepos } from './lib/github'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME

export default function App() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('stars')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [view, setView] = useState('grid')

  async function loadRepos() {
    try {
      setLoading(true)
      setError('')
      const data = await fetchAllStarredRepos()
      setRepos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRepos()
  }, [])

  // Reset to page 1 when perPage changes
  function handlePerPageChange(val) {
    setPage(1)
    setPerPage(val)
  }

  const filteredRepos = useMemo(() => {
    const q = query.toLowerCase()
    const filtered = repos.filter((repo) =>
      repo.full_name.toLowerCase().includes(q) ||
      repo.description?.toLowerCase().includes(q) ||
      repo.topics?.some((t) => t.toLowerCase().includes(q))
    )

    switch (sort) {
      case 'updated':
        filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        break
      case 'name':
        filtered.sort((a, b) => a.full_name.localeCompare(b.full_name))
        break
      default:
        filtered.sort((a, b) => b.stargazers_count - a.stargazers_count)
    }

    return filtered
  }, [repos, query, sort])

  // Reset to page 1 when the filtered set changes (new search/sort)
  useEffect(() => {
    setPage(1)
  }, [query, sort])

  const pageRepos = useMemo(() => {
    const start = (page - 1) * perPage
    return filteredRepos.slice(start, start + perPage)
  }, [filteredRepos, page, perPage])

  const hasNext = page * perPage < filteredRepos.length
  const hasPrev = page > 1

  return (
    <div className="min-h-screen bg-bg text-white">
      <Topbar total={filteredRepos.length} username={USERNAME} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <SearchBar
          query={query}
          setQuery={setQuery}
          perPage={perPage}
          setPerPage={handlePerPageChange}
          sort={sort}
          setSort={setSort}
          view={view}
          setView={setView}
        />

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/8 px-5 py-4">
            <p className="font-display text-xs text-red-400 tracking-wide">{error}</p>
          </div>
        )}

        <RepoGrid repos={pageRepos} loading={loading} view={view} />

        {/* Pagination */}
        {!error && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrev || loading}
              className="flex items-center gap-2 rounded-xl border border-border bg-panel px-5 py-3 font-display text-xs text-zinc-400 tracking-wider transition hover:border-zinc-600 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={14} />
              Prev
            </button>

            <div className="rounded-xl border border-border bg-panel px-5 py-3 font-display text-xs text-zinc-500 tracking-widest">
              PAGE {page}
            </div>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext || loading}
              className="flex items-center gap-2 rounded-xl border border-border bg-panel px-5 py-3 font-display text-xs text-zinc-400 tracking-wider transition hover:border-zinc-600 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
