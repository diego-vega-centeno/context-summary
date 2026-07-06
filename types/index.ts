// Core PR Types

export type WorkItemStatus = "open" | "merged" | "closed" | "stale";

export interface TrackedWorkItem {
  id: string;
  user_id: string;
  provider: string;
  owner: string;
  container: string;
  external_id: string;
  title: string;
  status: WorkItemStatus;
  author: string;
  created_at: Date;
  last_activity_at: Date;
  last_synced_at: Date;
  added_at: Date;
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

export interface WorkItemSummary {
  id: string;
  pr_id: string;
  summary_json: SummaryJSON;
  generated_at: Date; // ISO timestamptz
}

// Combined type — PR + its summary
// Used in Story View and enriched cards

export interface TrackedWorkItemWithSummary extends TrackedWorkItem {
  summary: WorkItemSummary | null;
}

export type WorkItemDashboardType = Pick<
  TrackedWorkItem,
  | "id"
  | "title"
  | "status"
  | "external_id"
  | "container"
  | "owner"
  | "author"
  | "last_activity_at"
> & { current_state: string | null };

export interface PromptSummaryInput {
  metadata: MetadataType;
  events: WorkItemTimelineEvent[];
}

export interface WorkItemWithSummaryJSON {
  metadata: MetadataType;
  summaryJSON: SummaryJSON;
}

export interface WorkItemTimelineEvent {
  type: string;
  user: string;
  state?: string;
  content?: string;
  timestamp: Date;
}

export interface MetadataType {
  external_id: string;
  provider: string;
  owner: string;
  container: string;
  work_item_type: string;
  title: string;
  description: string;
  author: string;
  status: string;
  created_at: Date;
  last_activity_at: Date;
}

export interface ActionReturn {
  success: boolean;
  error?: Array<{ message: string; code?: string }>;
  data?: {
    formValues?: Record<string, any>;
    [key: string]: any;
  };
}

export interface User {
  id: string;
  oauth_id: string;
  oauth_provider: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface UserAuth {
  name: string;
  email: string;
  id: string;
  stale_days: number;
}
