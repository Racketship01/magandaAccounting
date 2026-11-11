# Accounting Application

A Nuxt-based accounting application for managing bills, expenses, and financial records.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Deploying to Vercel

The Nitro preset is already set to `vercel`, so no `vercel.json` is required.

1. **Provision Postgres** with connection pooling. Use the **pooled** string for
   `DATABASE_URL` and the **direct** string for `DIRECT_URL`.
2. **Apply migrations** against production (from your machine, not during the build):

   ```bash
   pnpm db:deploy
   ```

3. **Import the repo** into Vercel (Framework Preset: Nuxt.js). Set:
   - Install Command: `pnpm install`
   - Build Command: `pnpm build` (runs `prisma generate && nuxt build`)
   - Node.js Version: 20.x or 22.x
4. **Add environment variables** (Production and Preview) — see `.env.example`:
   `NUXT_UI_PRO_LICENSE` (required at build time), `DATABASE_URL`, `DIRECT_URL`,
   `DATABASE_POOL_MAX`, `NUXT_SESSION_PASSWORD`, `BLOB_READ_WRITE_TOKEN`,
   `REDIS_URL`, `OPENAI_API_KEY`.
5. **Deploy** by pushing to your Git remote, then assign a production domain.

> Serverless notes: long-lived SSE notification streams are subject to Vercel's
> function duration limits — set `REDIS_URL` (e.g. Upstash) so notifications fan
> out across instances. The Vercel Blob store must be **public**.

## Project Information

This is an accounting application built with Nuxt 3, featuring:

- Bill management
- Expense tracking
- User authentication
- Notification system

For more information about Nuxt, visit the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).
