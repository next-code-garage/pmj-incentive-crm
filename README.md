# PMJ Incentive CRM

A CRM starter application built with Next.js App Router, React, TypeScript, Tailwind CSS, and PostgreSQL.

## Included

- Initial responsive login screen for the future CRM authentication flow
- Tailwind CSS styling ready for further product development
- PostgreSQL connection helper using `pg`
- `/api/health` route for validating the database connection
- Starter SQL schema for organizations, contacts, deals, and activities
- Neon/PostgreSQL configuration through the server-only `DATABASE_URL` environment variable
- Docker Compose service for optional local PostgreSQL development

## Get Started

Prerequisites: Node.js 24 with npm and a PostgreSQL connection string.

```bash
npm install
cp .env.example .env.local
# Set DATABASE_URL in .env.local
npm run db:init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To verify PostgreSQL connectivity, open
[http://localhost:3000/api/health](http://localhost:3000/api/health).

Run `npm run db:init` once to create the starter CRM tables in the configured database.
`.env.local` is ignored by Git and must not be committed.

For optional local PostgreSQL development, start Docker and set `DATABASE_URL` in `.env.local`
to `postgresql://crm_user:crm_password@localhost:5432/crm_db`:

```bash
docker compose up -d
```

The Docker database applies [`database/schema.sql`](./database/schema.sql) automatically the
first time its volume is created.

## Deploy To Vercel

1. Push the project to a Git provider and import it into Vercel. Vercel automatically detects
   Next.js projects and uses the application build command.
2. In **Project Settings > Environment Variables**, add `DATABASE_URL` for Production and any
   Preview environments that should use a database.
3. Use a Neon pooled connection string for deployed/serverless traffic. Neon identifies this by
   a hostname containing `-pooler`.
4. Initialize the production database once from a secure local shell using the production
   connection string in `.env.local`:

   ```bash
   npm run db:init
   ```

5. Deploy, then verify the login page and `/api/health`.

The database credential is consumed only by server-side code. Do not prefix it with
`NEXT_PUBLIC_`, which would expose it to the browser.

The current database health function is configured for Vercel's Singapore region (`sin1`) to
stay near the existing Southeast Asia Neon database. Apply the same region configuration to
future database-backed route handlers.

## Commands

```bash
npm run dev        # Start the local Next.js server
npm run build      # Build the production application
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
npm run db:init    # Initialize the configured PostgreSQL schema
docker compose up -d
docker compose down
```

## Project Structure

```text
src/
  app/
    page.tsx           Initial login screen
    api/health/        PostgreSQL health check endpoint
  lib/
    db.ts              Server-side database helper
database/
  schema.sql           Initial PostgreSQL schema
compose.yaml           Local PostgreSQL service
.env.example           Required local/server environment variable template
```

## Next Implementation Steps

- Add authentication and user/workspace permissions.
- Build contacts, leads, deals, and activities after login.
- Add migrations and seed data as the schema evolves.
