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
- Single app-level auth via Supabase (multi-user, each user has their own tracked PRs)
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
- Background polling via cron (every 30 min)
- Last synced timestamp on each card
- Status computed on sync, not on render

## Data Model

### `users`
Handled entirely by Supabase Auth — no custom table needed.

### `tracked_prs`
```
id                uuid, PK
user_id           uuid, FK → auth.users
repo_owner        text
repo_name         text
pr_number         integer
title             text
status            text  -- open / closed / merged / stale
author            text
created_at        timestamptz
last_activity_at  timestamptz
last_synced_at    timestamptz
added_at          timestamptz
```

### `pr_raw_data`
```
id              uuid, PK
pr_id           uuid, FK → tracked_prs
raw_json        jsonb
fetched_at      timestamptz
```
Stores full GitHub API response. Allows re-running AI summarization without hitting GitHub again.

### `pr_summaries`
```
id              uuid, PK
pr_id           uuid, FK → tracked_prs
summary_json    jsonb
generated_at    timestamptz
```

### Relationships
```
users → tracked_prs       one to many
tracked_prs → pr_raw_data      one to one (latest only)
tracked_prs → pr_summaries     one to one (latest only)
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

Card preview example:
```
PR #234 — Auth refactor          [STALE 12 days]
Blocked: waiting on @john decision about session handling
Last activity: 3 people discussed token expiry approach
```

## What's Next to Discuss
1. Application architecture — folder structure, API routes, sync strategy
2. Gemini prompt design — critical, the narrative quality is the entire product
3. GitHub API mapping — what endpoints to hit and what data feeds the prompt
