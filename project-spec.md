# PR Context — Project Specification

## Problem Statement
Development teams lose context constantly. PRs get merged, tickets closed, but *why* decisions were made, what was blocked, and what the current narrative is — that lives in scattered comments and people's heads. Managers especially suffer: they either interrupt devs or get a shallow status update with no context. Stale PRs are the worst case — coming back to them after days/weeks with no way to understand how things got to their current state.

## App Vision
An AI-powered dashboard that ingests GitHub PR data and reconstructs the **development narrative** — not just status, but the story of how decisions were made, who was involved, what blocked things, and what needs to happen next.

**The differentiator:** Other tools answer "what is the state?" — this app answers "how did we get here?" It's context recovery, not status aggregation.

## Target Users
- Engineering managers — oversight without interrupting developers
- Developers returning to stale PRs or joining mid-flight
- Open source contributors picking up abandoned issues

## Tech Stack
| Layer | Choice |
|---|---|
| Frontend + Backend | Next.js (App Router) |
| Database | Supabase (free tier, Postgres + Auth) |
| AI | Gemini 1.5 Flash (free, 1M context window) |
| GitHub Integration | GitHub REST API (public repos only) |
| Deployment | Vercel (free tier) |

## MVP Scope — Constraints
- Public GitHub repos only (no auth/token required)
- User adds PRs by URL — no repo ownership needed
- No Jira/Bitbucket integration (post-MVP)
- No private repo support (post-MVP)
- No notifications (post-MVP)
- Stale threshold: 7 days of no activity

## Feature List

### 1. PR Tracking
- Add a PR by URL
- Remove a tracked PR
- Display repo, title, status (open/closed/merged/stale)
- Stale detection: no activity in 7+ days

### 2. Dashboard View
- Aggregate stats: total tracked, open, merged, closed, stale
- Cards per PR showing:
  - Status + stale indicator
  - Last activity date
  - AI-generated one-liner (current state or blocker)
- Filter/sort by status and last activity

### 3. PR Story View
- Chronological narrative reconstructed by AI
- Collapsible sections:
  - What was being built and why
  - Key decisions made and by whom
  - Blocking points with context
  - Current state
  - Suggested next steps
- Links back to original GitHub thread per decision point

### 4. Sync
- Manual refresh per PR
- Last synced timestamp on each card
- Status computed on sync, not on render

## Data Model

### `users`
id                uuid, PK
oauth_id          text
oauth_provider    text  -- google / github
name              varchar
email             text
password          text
created_at        timestamptz
stale_days        integer

### `tracked_work_items`
```
id                uuid, PK
user_id           uuid, FK → auth.users
provider work_provider
work_item_type work_item_type 
owner        text
container         text
external_id       text
title             text
status            text  -- open / closed / merged / stale
author            text
created_at        timestamptz
last_activity_at  timestamptz
last_synced_at    timestamptz
added_at          timestamptz
```

<!-- Not saving raw github data -->
<!-- ### `pr_raw_data`
```
id              uuid, PK
external_id           uuid, FK → tracked_work_items
raw_json        jsonb
fetched_at      timestamptz
```
Stores full GitHub API response. Allows re-running AI summarization without hitting GitHub again. -->

### `work_item_summaries`
```
id              uuid, PK
work_item_id    uuid, FK → tracked_work_items
summary_json    jsonb
generated_at    timestamptz
```

### Relationships
```
users → tracked_work_items       one to many
tracked_work_items → work_item_raw_data      one to one (latest only)
tracked_work_items → work_item_summaries     one to one (latest only)
```

## AI Summary JSON Structure
```json
{
  "one_liner": "Blocked waiting on @john decision about session handling",

  "what_was_built": {
    "summary": "Auth refactor to support token refresh",
    "context": "Bug found in v1.1 where sessions expired silently"
  },

  "key_decisions": [
    {
      "decision": "Switched from JWT to session tokens",
      "context": "Discussed by @carl and @john on Feb 3",
      "made_by": "@john"
    }
  ],

  "blocking_points": [
    {
      "point": "Waiting on backend team to expose refresh endpoint",
      "context": "Raised by @carl on Feb 5, no response yet",
      "waiting_on": "@backend-team",
      "next_step": "Follow up with @john directly"
    }
  ],

  "current_state": "PR open, 2 approvals, 1 requested change unresolved",

  "next_steps": [
    "Resolve @mary requested change on line 45",
    "Get backend endpoint confirmation before merge"
  ]
}
```

## UI Structure
Two main views:

**Dashboard** — aggregated stats + PR cards with smart context previews. Quick scan for managers.

**PR Story View** — full chronological narrative with collapsible sections. Where the core value lives.

## UI/UX Decisions — Addendum

### General Layout
Fixed sidenav on the left, main content on the right.
Component library: lucide-react (clean, modern)
dark/light theme: next-themes

### Sidenav
- Dashboard
- PR Stories
- Settings
─────────────
- Theme toggle
- User email
- Sign out


<!-- Structure was updated -->
<!-- ### Route Structure
app/
├── page.tsx                          # Landing (simple hero + one CTA)
├── (auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (dashboard)/
│   ├── layout.tsx                    # Sidenav + header
│   ├── dashboard/page.tsx            # Stats row + kanban status board
│   ├── stories/page.tsx              # PR cards grid + filters
│   ├── stories/[id]/page.tsx         # Full story view
│   └── settings/page.tsx
└── api/
    ├── prs/route.ts                  # GET list, POST add PR
    ├── prs/[id]/route.ts             # GET, DELETE
    ├── prs/[id]/sync/route.ts        # POST manual sync
    ├── summarize/[id]/route.ts       # POST Gemini summarization
    └── cron/sync/route.ts            # GET Vercel cron job -->

### Page Descriptions

Landing (app/)
- Simple hero, one line explaining the app
- Demo and login buttons
- Example card

Dashboard (dashboard/)
- Stats row: total / open / merged / closed / stale as cards
- Kanban status board below: columns per status (layout only, no drag for MVP)
- Future V2: drag to assign custom states like priority or to-do

PR Stories (stories/)
- Cards grid (2 columns desktop, 1 mobile)
- Each card shows: title, repo, status badge, stale indicator, one-liner, last activity
- Filter bar: Search / total / Open / Merged / Closed / Stale
- "Add PR" button in header
- Click card → full story view (full page navigation)

Story View (stories/[id]/)
- Full page, not a drawer
- Back button → returns to PR Stories
- PR title + metadata at top (author, status, dates)
- Collapsible sections:
    - What was built and why
    - Key decisions (who, what, when)
    - Blocking points with context
    - Current state
    - Next steps
- Manual refresh button + last synced timestamp
- Direct URL accessible and shareable
- Delete PR button

### Navigation Flow
Landing → Dashboard (entry point after auth)

Sidenav: Dashboard / PR Stories / Settings

PR Stories → card click → Story View (full page)
Story View → back button → PR Stories

### Key UX Decisions
- Story view is full page (not drawer) — content needs space to breathe
- Kanban on dashboard is layout only for MVP, no drag behavior
- /stories/[id] URL reads naturally and is shareable
- Auth pages have no sidenav (centered card layout)
- Stale threshold: 7 days - changeable in settings
- Status computed on sync