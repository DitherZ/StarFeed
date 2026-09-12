# StarFeed

Browse your GitHub starred repos — search, sort, and switch between grid and list views.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the project root:
   ```
   cp .env.example .env
   ```

3. Edit `.env` and set your GitHub username:
   ```
   VITE_GITHUB_USERNAME=your-github-username
   ```

   No token or API key needed — the app uses GitHub's public starred-repos endpoint.

## Run locally

```
npm run dev
```

Opens at `http://localhost:5173` by default.

## Build for production

```
npm run build
```

Outputs static files to `dist/`. This is a plain static site — no server required.

To preview the production build locally:
```
npm run preview
```

## Deploy

Since this builds to plain static files, it runs on any static host. A few options:

- **Vercel**: `vercel deploy` (auto-detects Vite)
- **Cloudflare Pages**: connect the repo, build command `npm run build`, output directory `dist`
- **GitHub Pages**: build, then push the `dist/` folder to a `gh-pages` branch
- **Self-hosted**: build, then serve `dist/` with any web server (nginx, Caddy, `python3 -m http.server`, etc.)

Whichever host you use, set the `VITE_GITHUB_USERNAME` environment variable there before building — Vite bakes it into the build at build time.

## Notes

- Unauthenticated GitHub API requests are rate-limited to 60/hour per IP. Fine for personal use; if you hit the limit, wait an hour and reload.
- Fetches up to 300 starred repos.
