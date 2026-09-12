import { Search, ChevronDown, LayoutGrid, List } from 'lucide-react'

function SelectField({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none rounded-xl border border-border bg-panel pl-4 pr-9 py-3 font-display text-xs text-zinc-300 tracking-wider outline-none transition focus:border-zinc-600 cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600" />
    </div>
  )
}

export default function SearchBar({ query, setQuery, perPage, setPerPage, sort, setSort, view, setView }) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-panel p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative flex-1 lg:max-w-xl">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
        <input
          type="text"
          placeholder="Search by name or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-black pl-10 pr-4 py-3 font-body text-sm text-zinc-200 placeholder:text-zinc-700 outline-none transition focus:border-zinc-600"
        />
      </div>

      <div className="flex gap-3">
        <SelectField value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="stars">Most Stars</option>
          <option value="updated">Recently Updated</option>
          <option value="name">A → Z</option>
        </SelectField>

        <SelectField value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
          <option value={20}>20 repos</option>
          <option value={50}>50 repos</option>
          <option value={100}>100 repos</option>
        </SelectField>

        <div className="flex items-center gap-1 rounded-xl border border-border bg-panel p-1">
          <button
            type="button"
            onClick={() => setView('grid')}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            className={`rounded-lg p-2 transition ${
              view === 'grid' ? 'bg-black text-zinc-200' : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            aria-label="List view"
            aria-pressed={view === 'list'}
            className={`rounded-lg p-2 transition ${
              view === 'list' ? 'bg-black text-zinc-200' : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            <List size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
