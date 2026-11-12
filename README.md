# once-twice

An open-source auction marketplace. Sellers list items, buyers bid in real time,
and each auction closes exactly on time: *once, twice, sold!*

> Work in progress. The repository is at the setup stage: no feature is built yet.

## Repository layout

This is a monorepo managed with npm workspaces.

| Folder | Package | Role |
|---|---|---|
| `apps/web` | `@once-twice/web` | Front end (framework not chosen yet) |
| `apps/api` | `@once-twice/api` | Back end (framework not chosen yet) |
| `packages/shared` | `@once-twice/shared` | Types shared by the front end and the back end |

## Getting started

Requirements: Node.js 24 or later (see `.nvmrc`) and npm.

```bash
npm install
npm run build
```

Root scripts run in every workspace that defines them:

| Script | What it does |
|---|---|
| `npm run build` | Builds every package |
| `npm run typecheck` | Type-checks every package |
| `npm test` | Runs every test suite |

## How this project is built

I write the critical code myself: auction rules, bidding, concurrency, closing.
An AI assistant acts as a mentor: it gives me tasks, reviews my code and explains
the concepts I do not master yet. Configuration and boilerplate are delegated to it.

## License

[MIT](LICENSE)
