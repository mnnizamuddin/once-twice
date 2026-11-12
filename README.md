# once-twice

An open-source auction marketplace. Sellers list items, buyers bid in real time,
and each auction closes exactly on time: *once, twice, sold!*

> Work in progress. The repository is at the setup stage: no feature is built yet.

## Stack

| Layer | Choice |
|---|---|
| Front end | Next.js (App Router), React, Tailwind CSS |
| Back end | NestJS |
| Database | PostgreSQL, accessed with Drizzle ORM |
| Language | TypeScript everywhere |

## Repository layout

This is a monorepo managed with npm workspaces.

| Folder | Package | Role |
|---|---|---|
| `apps/web` | `@once-twice/web` | Front end (Next.js) |
| `apps/api` | `@once-twice/api` | Back end (NestJS) |
| `packages/shared` | `@once-twice/shared` | Types shared by the front end and the back end |

## Getting started

Requirements: Node.js 24 or later (see `.nvmrc`) and npm. No Docker needed:
the local database runs with [embedded-postgres](https://github.com/leinelissen/embedded-postgres).

```bash
npm install
npm run build
cp apps/api/.env.example apps/api/.env
```

Then, in three terminals:

```bash
npm run db:start -w @once-twice/api    # PostgreSQL on port 54329
npm run start:dev -w @once-twice/api   # API on http://localhost:3001
npm run dev -w @once-twice/web         # Web app on http://localhost:3000
```

Check that the API reaches the database: http://localhost:3001/health

Root scripts run in every workspace that defines them:

| Script | What it does |
|---|---|
| `npm run build` | Builds every package |
| `npm run typecheck` | Type-checks every package |
| `npm test` | Runs every unit test suite |

## How this project is built

I write the critical code myself: auction rules, bidding, concurrency, closing.
An AI assistant acts as a mentor: it gives me tasks, reviews my code and explains
the concepts I do not master yet. Configuration and boilerplate are delegated to it.

## License

[MIT](LICENSE)
