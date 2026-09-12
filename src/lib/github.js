const USERNAME = import.meta.env.VITE_GITHUB_USERNAME

const MAX_REPOS = 300
const FETCH_PER_PAGE = 100

export async function fetchAllStarredRepos() {
  const repos = []

  for (let page = 1; repos.length < MAX_REPOS; page++) {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/starred?per_page=${FETCH_PER_PAGE}&page=${page}`,
      {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} — check your username in .env, or you may be rate-limited (unauthenticated requests: 60/hour)`)
    }

    const batch = await response.json()
    repos.push(...batch)

    if (batch.length < FETCH_PER_PAGE) break
  }

  return repos
}

export function getRepoImage(repo) {
  return `https://opengraph.githubassets.com/1/${repo.full_name}`
}

export function formatNumber(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toLocaleString()
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'today'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}
