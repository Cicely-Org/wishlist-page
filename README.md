# Cicely — Version Control for Blender

Linear-inspired Next.js 14 landing page with Neon DB integration.

## Tech Stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — full custom design system
- **Inter** (UI) + **JetBrains Mono** (code/labels)  
- **Neon DB** via `@neondatabase/serverless`

## Color Palette
| Token | Hex | Usage |
|---|---|---|
| Violet | `#3225b9` | Primary brand, CTAs, highlights |
| Emerald | `#01c796` | Success states, live badges, accents |
| Purple | `#a52aff` | Secondary actions, feedback card |
| Deep | `#422184` | Gradient depths, dark overlays |

## Quick Start

```bash
# 1. Install
npm install

# 2. Set up env
cp .env.local.example .env.local
# → paste your Neon DATABASE_URL

# 3. Dev
npm run dev
```

Tables auto-create on first API call. No migrations needed.

## Pages / API

| Route | Description |
|---|---|
| `/` | Full landing page |
| `POST /api/waitlist` | Save to `waitlist` table |
| `POST /api/feedback` | Save to `feedback` table |

## Database Schema

### `waitlist`
```sql
id, name, email (unique), role, blender_experience, created_at
```

### `feedback`
```sql
id, email, problem, notify_updates (bool), created_at
```

## Deploy

```bash
npx vercel
# Set DATABASE_URL in Vercel project settings
```
