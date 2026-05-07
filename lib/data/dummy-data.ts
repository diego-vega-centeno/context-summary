import { TrackedPRWithSummary } from '@/types/index'

// Dummy data — 8 PRs: open (3), merged (2), closed (1), stale (2)

export const dummyPRs: TrackedPRWithSummary[] = [
  // ── OPEN ──────────────────────────────────

  {
    id: 'pr-001',
    user_id: 'user-dummy',
    repo_owner: 'acme-corp',
    repo_name: 'payments-service',
    pr_number: 234,
    title: 'Refactor auth token handling to support refresh flow',
    status: 'open',
    author: 'carlos_dev',
    created_at: '2024-03-01T09:00:00Z',
    last_activity_at: '2024-03-10T14:30:00Z',
    last_synced_at: '2024-03-10T15:00:00Z',
    added_at: '2024-03-02T08:00:00Z',
    summary: {
      id: 'sum-001',
      pr_id: 'pr-001',
      generated_at: '2024-03-10T15:01:00Z',
      summary_json: {
        one_liner: 'Blocked waiting on @john to confirm session expiry strategy before merge.',
        what_was_built: {
          summary: 'A new token refresh flow to replace the current static JWT implementation in the payments service.',
          context: 'Users were being silently logged out during long checkout sessions. Bug was first reported in v1.1 and confirmed by 3 separate customer complaints in February.',
        },
        key_decisions: [
          {
            decision: 'Switch from stateless JWT to server-side session tokens with refresh capability.',
            context: 'Discussed in PR comments on Feb 28. @carlos_dev proposed the change after benchmarking session overhead.',
            made_by: '@carlos_dev',
          },
          {
            decision: 'Store refresh tokens in httpOnly cookies instead of localStorage.',
            context: '@mary raised the XSS vulnerability risk on Mar 3. Team agreed unanimously.',
            made_by: '@mary',
          },
        ],
        blocking_points: [
          {
            point: 'Backend refresh endpoint not yet exposed by the auth-service team.',
            context: '@carlos_dev flagged this on Mar 7. The endpoint exists internally but is not public-facing yet.',
            waiting_on: '@john (auth-service lead)',
            next_step: 'Follow up directly with @john — last message was 3 days ago with no response.',
          },
        ],
        current_state: 'PR is open with 2 approvals. One requested change from @mary is resolved. Blocked on backend dependency.',
        next_steps: [
          'Get confirmation from @john on refresh endpoint timeline.',
          'Once endpoint is available, update base URL config and run integration tests.',
          'Request final review from @mary before merge.',
        ],
      },
    },
  },

  {
    id: 'pr-002',
    user_id: 'user-dummy',
    repo_owner: 'nova-labs',
    repo_name: 'dashboard-ui',
    pr_number: 87,
    title: 'Add real-time notification panel with websocket support',
    status: 'open',
    author: 'sofia_m',
    created_at: '2024-03-05T11:00:00Z',
    last_activity_at: '2024-03-11T09:15:00Z',
    last_synced_at: '2024-03-11T10:00:00Z',
    added_at: '2024-03-06T08:00:00Z',
    summary: {
      id: 'sum-002',
      pr_id: 'pr-002',
      generated_at: '2024-03-11T10:01:00Z',
      summary_json: {
        one_liner: 'Active review ongoing — debating websocket vs SSE approach.',
        what_was_built: {
          summary: 'A real-time notification panel for the dashboard that pushes alerts without page refresh.',
          context: 'Product team requested this after user feedback showed high refresh rates on the dashboard — users were manually refreshing to check for updates.',
        },
        key_decisions: [
          {
            decision: 'Use native WebSocket API over a third-party library like Socket.io.',
            context: '@sofia_m argued for keeping the bundle size small. Discussed on Mar 6.',
            made_by: '@sofia_m',
          },
        ],
        blocking_points: [
          {
            point: 'Team is split between WebSocket and Server-Sent Events (SSE) approach.',
            context: '@alex raised SSE as simpler and sufficient since notifications are server-to-client only. Discussion started Mar 9 and is still open.',
            waiting_on: 'Team decision / @tech-lead',
            next_step: 'Tech lead needs to make a final call to unblock the implementation direction.',
          },
        ],
        current_state: 'PR is open, implementation is WebSocket-based but may need rework depending on team decision. 1 approval so far.',
        next_steps: [
          'Tech lead to decide between WebSocket and SSE.',
          'If SSE: @sofia_m to refactor implementation (estimated 1 day).',
          'If WebSocket: proceed to final review.',
        ],
      },
    },
  },

  {
    id: 'pr-003',
    user_id: 'user-dummy',
    repo_owner: 'stackwise',
    repo_name: 'api-gateway',
    pr_number: 412,
    title: 'Rate limiting middleware for public API endpoints',
    status: 'open',
    author: 'dev_rami',
    created_at: '2024-03-08T08:30:00Z',
    last_activity_at: '2024-03-11T16:00:00Z',
    last_synced_at: '2024-03-11T16:30:00Z',
    added_at: '2024-03-08T09:00:00Z',
    summary: {
      id: 'sum-003',
      pr_id: 'pr-003',
      generated_at: '2024-03-11T16:31:00Z',
      summary_json: {
        one_liner: 'Implementation complete, waiting on security team sign-off before merge.',
        what_was_built: {
          summary: 'A Redis-backed rate limiting middleware applied to all public API routes to prevent abuse.',
          context: 'A spike in API abuse was detected on Mar 1 — one client was making 10,000 requests/minute. This caused degraded performance for all other users.',
        },
        key_decisions: [
          {
            decision: 'Use Redis for rate limit counters instead of in-memory storage.',
            context: 'In-memory would not work across multiple API gateway instances. @dev_rami proposed Redis on Mar 8.',
            made_by: '@dev_rami',
          },
          {
            decision: 'Apply a sliding window algorithm instead of fixed window.',
            context: '@priya pointed out that fixed window has edge cases at window boundaries. Agreed on Mar 9.',
            made_by: '@priya',
          },
        ],
        blocking_points: [
          {
            point: 'Security team review required before any middleware touching public endpoints can be merged.',
            context: 'Company policy established after a security incident in Q4 2023. @dev_rami submitted review request on Mar 10.',
            waiting_on: '@security-team',
            next_step: 'Ping @security-team — SLA is 48 hours, now at 36 hours.',
          },
        ],
        current_state: 'Implementation complete and tested. 3 approvals from engineering. Blocked on mandatory security review.',
        next_steps: [
          'Await security team approval.',
          'If approved, merge immediately — no further changes needed.',
          'Monitor Redis memory usage post-deploy.',
        ],
      },
    },
  },

  // ── MERGED ────────────────────────────────

  {
    id: 'pr-004',
    user_id: 'user-dummy',
    repo_owner: 'acme-corp',
    repo_name: 'payments-service',
    pr_number: 198,
    title: 'Migrate database connection pool to PgBouncer',
    status: 'merged',
    author: 'john_arch',
    created_at: '2024-02-10T10:00:00Z',
    last_activity_at: '2024-02-20T17:00:00Z',
    last_synced_at: '2024-03-11T10:00:00Z',
    added_at: '2024-02-11T08:00:00Z',
    summary: {
      id: 'sum-004',
      pr_id: 'pr-004',
      generated_at: '2024-03-11T10:01:00Z',
      summary_json: {
        one_liner: 'Successfully merged after resolving connection leak issue discovered during load testing.',
        what_was_built: {
          summary: 'Migration of the payments service database connections from direct Postgres connections to PgBouncer connection pooling.',
          context: 'Production incidents in January showed the service exhausting Postgres connection limits under peak load (Black Friday traffic simulation). Direct connections were not scalable.',
        },
        key_decisions: [
          {
            decision: 'Use transaction mode pooling instead of session mode.',
            context: 'Session mode would not reduce connection count enough. @john_arch benchmarked both on Feb 12.',
            made_by: '@john_arch',
          },
          {
            decision: 'Deploy PgBouncer as a sidecar container rather than a separate service.',
            context: 'Reduces network latency and simplifies deployment. Decided by @john_arch and @devops_lead on Feb 15.',
            made_by: '@devops_lead',
          },
        ],
        blocking_points: [
          {
            point: 'Connection leak discovered during load testing on Feb 18.',
            context: 'Connections were not being returned to the pool after certain error paths. Found by @qa_team during stress test.',
            waiting_on: 'Fix by @john_arch',
            next_step: 'Was resolved — @john_arch patched the error handling on Feb 19.',
          },
        ],
        current_state: 'Merged on Feb 20. Deployed to production Feb 21. Connection count reduced by 78% under peak load.',
        next_steps: [
          'Monitor connection pool metrics for 2 weeks post-deploy.',
          'Document PgBouncer config for future reference.',
        ],
      },
    },
  },

  {
    id: 'pr-005',
    user_id: 'user-dummy',
    repo_owner: 'nova-labs',
    repo_name: 'mobile-app',
    pr_number: 56,
    title: 'Implement offline mode with local data sync',
    status: 'merged',
    author: 'lin_fe',
    created_at: '2024-01-15T09:00:00Z',
    last_activity_at: '2024-02-01T11:00:00Z',
    last_synced_at: '2024-03-11T10:00:00Z',
    added_at: '2024-01-16T08:00:00Z',
    summary: {
      id: 'sum-005',
      pr_id: 'pr-005',
      generated_at: '2024-03-11T10:01:00Z',
      summary_json: {
        one_liner: 'Merged after 3 weeks of development — offline mode now live in v2.4.',
        what_was_built: {
          summary: 'Full offline mode for the mobile app using SQLite local storage with background sync when connectivity is restored.',
          context: 'Top requested feature from enterprise customers who use the app in low-connectivity environments (warehouses, field operations). Requested since Q3 2023.',
        },
        key_decisions: [
          {
            decision: 'Use SQLite via expo-sqlite instead of AsyncStorage for structured offline data.',
            context: 'AsyncStorage is key-value only and not suitable for relational data. Decision made on Jan 16.',
            made_by: '@lin_fe',
          },
          {
            decision: 'Conflict resolution strategy: last-write-wins with server as source of truth.',
            context: 'Simpler than operational transforms. Accepted trade-off for V1 of offline mode. Discussed Jan 22.',
            made_by: '@product_lead',
          },
        ],
        blocking_points: [],
        current_state: 'Merged Feb 1. Released in v2.4 on Feb 5. No blocking issues during rollout.',
        next_steps: [
          'Monitor sync conflict rate in analytics.',
          'Plan V2 conflict resolution improvement for Q3.',
        ],
      },
    },
  },

  // ── CLOSED ────────────────────────────────

  {
    id: 'pr-006',
    user_id: 'user-dummy',
    repo_owner: 'stackwise',
    repo_name: 'billing-module',
    pr_number: 301,
    title: 'Add support for annual subscription billing cycle',
    status: 'closed',
    author: 'petra_k',
    created_at: '2024-02-01T10:00:00Z',
    last_activity_at: '2024-02-14T12:00:00Z',
    last_synced_at: '2024-03-11T10:00:00Z',
    added_at: '2024-02-02T08:00:00Z',
    summary: {
      id: 'sum-006',
      pr_id: 'pr-006',
      generated_at: '2024-03-11T10:01:00Z',
      summary_json: {
        one_liner: 'Closed without merge — billing logic moved to a third-party provider instead.',
        what_was_built: {
          summary: 'Custom implementation of annual billing cycle logic inside the internal billing module.',
          context: 'Sales team needed annual billing to close enterprise deals. Initially scoped as an internal feature.',
        },
        key_decisions: [
          {
            decision: 'Abandon custom implementation in favor of Stripe Billing.',
            context: 'After 2 weeks of development, @cto pointed out that Stripe Billing handles annual cycles natively and reduces maintenance burden. Decision made Feb 13.',
            made_by: '@cto',
          },
        ],
        blocking_points: [
          {
            point: 'Proration logic for mid-cycle upgrades was significantly more complex than estimated.',
            context: '@petra_k raised this on Feb 10 after discovering edge cases with partial months. Estimated 2 more weeks of work.',
            waiting_on: 'Was the trigger for the pivot decision.',
            next_step: 'N/A — PR closed in favor of Stripe Billing integration.',
          },
        ],
        current_state: 'PR closed Feb 14. A separate PR for Stripe Billing integration was opened by @john_arch (PR #312).',
        next_steps: [
          'Track PR #312 for Stripe Billing integration.',
          'Ensure @petra_k is involved in the Stripe implementation for context.',
        ],
      },
    },
  },

  // ── STALE ─────────────────────────────────

  {
    id: 'pr-007',
    user_id: 'user-dummy',
    repo_owner: 'orion-tech',
    repo_name: 'data-pipeline',
    pr_number: 78,
    title: 'Add Kafka consumer for real-time event processing',
    status: 'stale',
    author: 'marco_b',
    created_at: '2024-01-20T10:00:00Z',
    last_activity_at: '2024-02-10T09:00:00Z',
    last_synced_at: '2024-03-11T10:00:00Z',
    added_at: '2024-01-21T08:00:00Z',
    summary: {
      id: 'sum-007',
      pr_id: 'pr-007',
      generated_at: '2024-03-11T10:01:00Z',
      summary_json: {
        one_liner: 'Stale for 29 days — blocked on infrastructure team provisioning Kafka cluster.',
        what_was_built: {
          summary: 'A Kafka consumer service to replace the current polling-based event ingestion in the data pipeline.',
          context: 'The polling approach was causing up to 90 second delays in event processing. Real-time processing was required for a new analytics feature promised to customers in Q1.',
        },
        key_decisions: [
          {
            decision: 'Use Kafka instead of RabbitMQ for the event bus.',
            context: 'Kafka chosen for its replay capability and retention. Decision made by @data_lead on Jan 22 after evaluating both options.',
            made_by: '@data_lead',
          },
        ],
        blocking_points: [
          {
            point: 'Kafka cluster has not been provisioned in the staging environment.',
            context: '@marco_b raised this on Feb 5. Infrastructure team said it was deprioritized due to a cloud cost freeze.',
            waiting_on: '@infra-team / cost freeze lifted',
            next_step: 'Escalate to engineering manager — cost freeze was supposed to end Feb 28.',
          },
        ],
        current_state: 'PR is complete and ready to test. Stale due to missing infrastructure. No activity since Feb 10.',
        next_steps: [
          'Confirm cost freeze status with @infra-team.',
          'If Kafka provisioning is still blocked, evaluate using a mock Kafka via Docker for staging tests.',
          'Reassign priority if Q1 deadline is still active.',
        ],
      },
    },
  },

  {
    id: 'pr-008',
    user_id: 'user-dummy',
    repo_owner: 'bluewave-io',
    repo_name: 'search-service',
    pr_number: 145,
    title: 'Migrate full-text search from Elasticsearch to Typesense',
    status: 'stale',
    author: 'ana_search',
    created_at: '2024-01-05T09:00:00Z',
    last_activity_at: '2024-01-28T14:00:00Z',
    last_synced_at: '2024-03-11T10:00:00Z',
    added_at: '2024-01-06T08:00:00Z',
    summary: {
      id: 'sum-008',
      pr_id: 'pr-008',
      generated_at: '2024-03-11T10:01:00Z',
      summary_json: {
        one_liner: 'Stale for 42 days — migration paused after performance regression found in edge case queries.',
        what_was_built: {
          summary: 'Full migration of the search service from a self-hosted Elasticsearch cluster to Typesense Cloud to reduce ops overhead and cost.',
          context: 'Elasticsearch cluster was costing $3,200/month and required dedicated DevOps attention. Typesense was evaluated in December and showed comparable performance at 1/5 the cost.',
        },
        key_decisions: [
          {
            decision: 'Migrate in a shadow mode first — run both engines in parallel and compare results.',
            context: '@ana_search proposed this to de-risk the migration. Approved by @engineering_lead on Jan 8.',
            made_by: '@ana_search',
          },
          {
            decision: 'Pause migration after shadow mode revealed ranking differences on fuzzy queries.',
            context: 'On Jan 25, shadow mode showed Typesense returning different result ordering for 3-word fuzzy queries. Not a bug but a tuning issue.',
            made_by: '@engineering_lead',
          },
        ],
        blocking_points: [
          {
            point: 'Typesense ranking for fuzzy multi-word queries does not match Elasticsearch behavior.',
            context: '@ana_search documented 12 edge cases on Jan 27. Typesense support was contacted but no response yet.',
            waiting_on: 'Typesense support response + internal tuning decision.',
            next_step: 'Decide whether to tune Typesense config to match ES behavior or accept the difference and update relevance tests.',
          },
        ],
        current_state: 'Shadow mode is running. Migration is paused. PR has not been updated since Jan 28. No active discussion.',
        next_steps: [
          'Follow up with Typesense support — ticket opened Jan 27.',
          'Schedule 1hr with @ana_search and @engineering_lead to decide on relevance tuning strategy.',
          'Set a deadline — if not resolved by Mar 20, consider abandoning migration for now.',
        ],
      },
    },
  },
]

export const getPRsByStatus = (status: string) =>
  dummyPRs.filter((pr) => pr.status === status)

export const getDummyPRById = (id: string) =>
  dummyPRs.find((pr) => pr.id === id) ?? null
