# PMJ Incentive CRM

A CRM starter application built with Next.js App Router, React, TypeScript, Tailwind CSS, and PostgreSQL.

## Included

- Admin username/password login with hashed credentials and expiring server-side sessions
- Tailwind CSS styling ready for further product development
- PostgreSQL connection helper using `pg`
- `/api/health` route for validating the database connection
- PostgreSQL schema for administrator credentials and sessions
- Admin account creation command and protected `/admin` workspace
- Neon/PostgreSQL configuration through the server-only `DATABASE_URL` environment variable
- Docker Compose service for optional local PostgreSQL development

## Get Started

Prerequisites: Node.js 24 with npm and a PostgreSQL connection string.

```bash
npm install
cp .env.example .env.local
# Set DATABASE_URL in .env.local
npm run db:init
npm run admin:create -- admin 'choose-a-long-unique-password'
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To verify PostgreSQL connectivity, open
[http://localhost:3000/api/health](http://localhost:3000/api/health).

Run `npm run db:init` once to create the authentication tables in the configured database.
Then create the administrator username and password:

```bash
npm run admin:create -- <username> '<password>'
```

Passwords must be at least 12 characters and are stored as scrypt hashes, not plain text. The
command can be run again for the same username to reset its password.
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

5. Create the production administrator from a secure local shell pointed at the production
   database:

   ```bash
   npm run admin:create -- admin 'choose-a-long-unique-password'
   ```

6. Deploy, then verify login, logout, protected `/admin` access, and `/api/health`.

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
npm run admin:create -- <username> '<password>'
docker compose up -d
docker compose down
```

## Project Structure

```text
src/
  app/
    page.tsx           Admin login screen
    admin/             Protected admin landing page
    api/auth/          Login and logout endpoints
    api/health/        PostgreSQL health check endpoint
  lib/
    auth.ts            Admin credential and session functions
    db.ts              Server-side database helper
database/
  schema.sql           Administrator authentication schema
scripts/
  create-admin.mjs     Create or reset an administrator account
compose.yaml           Local PostgreSQL service
.env.example           Required local/server environment variable template
```

## Authentication Notes

- Admin sessions are stored in PostgreSQL and expire after 12 hours.
- Session cookies are HTTP-only, `SameSite=Lax`, and marked secure in production.
- Five failed password attempts lock the account for 15 minutes.
- Add operational CRM data tables as each admin module is implemented.
