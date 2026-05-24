// Core PR Types

export type PRStatus = "open" | "merged" | "closed" | "stale";

export interface TrackedPR {
  id: string;
  user_id: string;
  repo_owner: string;
  repo_name: string;
  pr_number: number;
  title: string;
  status: PRStatus;
  author: string;
  created_at: string; // ISO timestamptz
  last_activity_at: string; // ISO timestamptz
  last_synced_at: string; // ISO timestamptz
  added_at: string; // ISO timestamptz
}

// Summary JSON Nested Types

export interface WhatWasBuilt {
  summary: string;
  context: string;
}

export interface KeyDecision {
  decision: string;
  context: string;
  made_by: string;
}

export interface BlockingPoint {
  point: string;
  context: string;
  waiting_on: string;
  next_step: string;
}

// Full Summary JSON Shape

export interface SummaryJSON {
  one_liner: string;
  what_was_built: WhatWasBuilt;
  key_decisions: KeyDecision[];
  blocking_points: BlockingPoint[];
  current_state: string;
  next_steps: string[];
}

// PR Summary Record (maps to pr_summaries table)

export interface PRSummary {
  id: string;
  pr_id: string;
  summary_json: SummaryJSON;
  generated_at: string; // ISO timestamptz
}

// Combined type — PR + its summary
// Used in Story View and enriched cards

export interface TrackedPRWithSummary extends TrackedPR {
  summary: PRSummary | null;
}

export type PRDashboardType = Pick<
  TrackedPR,
  | "id"
  | "title"
  | "status"
  | "pr_number"
  | "repo_name"
  | "repo_owner"
  | "author"
  | "last_activity_at"
> & { current_state: string | null };

export interface TrackedPRWithTimeline {
  metadata: {
    id: number;
    repo_owner: string;
    repo_name: string;
    title: string;
    description: string;
    author: string;
    state: string;
    created_at: string;
  };
  timeline: Array<{
    type: string;
    user: string;
    state?: string;
    content?: string;
    timestamp: string;
  }>;
}
