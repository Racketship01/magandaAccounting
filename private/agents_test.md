# AGENTS.md

## Project overview

- Frontend: Nuxt 3 (Vue 3 + TypeScript)
- Language: TypeScript (strict mode)
- Database: Prisma ORM (PostgreSQL recommended)
- Package manager: pnpm (preferred) or npm
- Key goals: type-safe APIs, fast dev loop, clear conventions for AI agents

## Dev environment setup

1. Install dependencies
   - `pnpm install`
2. Set up environment variables
   - Copy `.env.example` → `.env` (if not exists)
   - Required vars:
     - `DATABASE_URL="file:./dev.db"`
3. Generate Prisma client
   - `pnpm prisma generate`
4. Run migrations (if schema changed)
   - `pnpm prisma migrate dev`
5. Start dev server
   - `pnpm dev`
   - App: http://localhost:3000 (if not exists)

## Common commands

- Build: `pnpm build`
- Preview: `pnpm preview`
- Lint: `pnpm lint`
- Lint fix: `pnpm lint --fix`
- Type check: `pnpm typecheck`
- Test: `pnpm test`
- Test watch: `pnpm test:watch`
- Prepare: `husky`
- Prisma studio: `pnpm prisma studio`
- Generate Prisma client (after schema changes): `pnpm prisma generate`

## Code style & conventions

- TypeScript:
  - `strict: true` in `tsconfig.json`
  - Prefer explicit types for public APIs; infer internally when clear
  - Use `type` for interfaces/objects, `interface` only for OTP/declaration merging needs
- Nuxt:
  - Use `pages/` for routing; file-based routing is authoritative
  - Use `composables/` for shared logic in every layers (e.g., `useAuth.ts`)
  - Use `server/api/` for API routes (Nitro); return `useResponse()` or `return json()`
  - Prefer `useState` for page-level reactive state; avoid global Vuex/Pinia unless necessary
  - Use `definePageMeta({ auth: true })` for protected routes
- Prisma:
  - Keep schema in `prisma/schema.prisma`; one model per domain entity
  - Name relations explicitly: `User.posts Post[]`
  - Use migrations for schema changes; never edit DB directly in dev
  - Generated client lives in `node_modules/.prisma`; don’t commit it
- Testing:
  - Unit: Vitest (default in Nuxt)
  - E2E: Playwright or Cypress (if present)
  - Write tests alongside code; add/update tests when changing behavior

## Security & secrets

- Never commit secrets to repo; use `.env` and `.env.example`
- Add `.env` to `.gitignore`
- Sanitize user input at API boundaries
- Use environment variables for DB credentials and API keys

## Git & PR guidelines

- Branch naming: `feature/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`
- Commit messages: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`)
- PR title: `[area] Short, imperative description`
- Before PR:
  - `pnpm lint` and `pnpm typecheck` pass
  - `pnpm test` passes
  - Migrations applied and tested locally (`pnpm prisma migrate dev`)

## Agent behavior instructions

- When changing the schema:
  1. Update `prisma/schema.prisma`
  2. Run `pnpm prisma migrate dev` to generate migration
  3. Run `pnpm prisma generate`
  4. Update related types/composables/server/api as needed
- When adding a page:
  1. Create file in `pages/` (e.g., `pages/posts/[id].vue`)
  2. Add `definePageMeta` if auth/layout needed
  3. Add tests and update docs if applicable
- When adding an API route:
  1. Create `server/api/<route>.ts`
  2. Use `useEvent()` and `return json()`
  3. Add input validation (Zod preferred) and type-safe responses
  4. Write unit tests for the handler
- Always prefer type-safe patterns and existing composables; avoid global state unless necessary.

## Dependencies to prefer

- Validation: `zod`
- HTTP client (if needed): `ofetch` (built into Nuxt)
- Auth: `@nuxt/auth` or custom server-side sessions (follow existing pattern)
- Styling: Tailwind CSS or Nuxt UI (follow existing project choice)

## Notes

- AGENTS.md is for coding agents; keep instructions precise and actionable [web:3]
- If this repo grows into a monorepo, add nested `AGENTS.md` per package [web:3]
