# MODELS

A fast, search-first catalog of AI models. Lives at [models.krisyotam.com](https://models.krisyotam.com).

The data comes from the open [models.dev](https://models.dev) catalog. The UI is a SvelteKit app with virtualized rows, keyboard-driven filtering, and a matte dark mode that matches the rest of [krisyotam.com](https://krisyotam.com).

## Why

I look at this catalog a lot. I wanted something snappier than the upstream site, with the filters I actually use and a dark theme that doesn't fight my eyes at night.

## Stack

- SvelteKit (Svelte 5, runes)
- Tailwind v4
- `@sveltejs/adapter-vercel`
- Hosted on Vercel, DNS via Cloudflare (CNAME only, no proxy)
- CI from [git.sr.ht/~krisyotam/models](https://git.sr.ht/~krisyotam/models) via `builds.sr.ht`

## Local development

```
pnpm install
pnpm dev
```

Open http://localhost:5173.

Other scripts:

```
pnpm check     # prettier + svelte-check + eslint
pnpm format    # prettier --write
pnpm build     # production build
pnpm preview   # serve the build
```

## Deploys

Pushes to `main` on sr.ht trigger `builds.sr.ht`, which runs `vercel pull && vercel build --prod && vercel deploy --prebuilt --prod`. Production aliases to `models.krisyotam.com`.

## License

MIT.
