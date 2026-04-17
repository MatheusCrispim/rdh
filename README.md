# RDH Clinical Dashboard

A production-ready clinical dashboard built for **Redirect Health** — optimized for AI-assisted development.

Built by **Matheus Crispim** as a demonstration of AI-first engineering: features are delivered from a requirements `.md` file using an orchestrated agent workflow (PRD → plan → implement → validate).

> 📖 **Understanding the AI-optimized patterns?** See [CODEBASE-GUIDE.md](./CODEBASE-GUIDE.md) for a full walkthrough.

## Features

| Feature | Description |
|---------|-------------|
| Patient List | View all patients with consultation status, filter by status, search by name |
| Consultation Notes | Add and view clinical notes per consultation |

## Stack

| Technology | Choice | AI Agent Benefit |
|------------|--------|------------------|
| Runtime | Bun | Faster iteration cycles |
| Framework | Next.js 16 | Predictable file conventions |
| Linting | Biome | 10-25x faster feedback loop |
| Type Safety | TS strict | Unambiguous errors, types as docs |
| Database | Drizzle ORM | Can't write invalid queries |
| Auth | Supabase Auth | Clear errors, 50K MAU free |
| Validation | Zod | Structured errors, self-documenting |
| Logging | Pino | Machine-readable debugging context |
| Testing | Bun test | 10x faster than Jest |
| UI | shadcn/ui | Agent can read/modify components |

## Quick Start

```bash
bun install
cp .env.example .env
# Edit .env with your Supabase credentials
bun run db:push
bun run dev
```

## Commands

```bash
bun run dev          # Start development server
bun run build        # Production build
bun run lint         # Check for lint/format errors
bun run lint:fix     # Auto-fix lint/format issues
bun test             # Run tests with coverage
bun run db:studio    # Open Drizzle Studio GUI
```

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected pages
│   └── api/               # API routes
├── core/                   # Shared infrastructure
│   ├── config/            # Environment validation
│   ├── database/          # Drizzle client & schema
│   ├── logging/           # Pino structured logging
│   └── supabase/          # Supabase clients
├── features/              # Vertical slices
│   ├── auth/              # Auth actions & hooks
│   ├── patients/          # Patient list + status
│   ├── consultation-notes/ # Clinical notes per consultation
│   └── projects/          # Base example slice
├── shared/                # Cross-feature utilities
└── components/            # UI components
```

## AI Workflow

Every feature in this repo was built using the agent workflow:

```
requirements.md → /plan → /implement → validate → ship
```

Agents produce machine-readable feedback that closes the loop:
- TypeScript: exact file:line errors
- Biome: lint errors with safe-fix suggestions
- Tests: expected vs actual diffs
- Logs: structured JSON with domain context

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```
