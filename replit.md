# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Environment Variables & Secrets

All secrets are stored in Replit Secrets (never committed to git).

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Groq API key for AI generation (`compound-beta-mini` model). Rotated April 2026 after accidental exposure in commit history. |
| `SUPABASE_URL` | Supabase project URL for database access. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (bypasses RLS). |
| `SUPABASE_ANON_KEY` | Supabase anonymous key for client-side access. |
| `SESSION_SECRET` | Secret used for session signing. |
| `DATABASE_URL` | PostgreSQL connection string (Replit built-in DB). |
