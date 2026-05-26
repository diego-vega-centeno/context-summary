DO $$ BEGIN
  CREATE TYPE pr_status AS ENUM ('open', 'closed', 'merged', 'stale');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  oauth_id TEXT UNIQUE,
  oauth_provider oauth_provider_type,
  name VARCHAR(255) NOT NULL,
  email TEXT UNIQUE,
  password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tracked_prs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  repo_owner TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  pr_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  status pr_status NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP,
  last_activity_at TIMESTAMP,
  last_synced_at TIMESTAMP,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (user_id, repo_owner, repo_name, pr_number)
)

CREATE TABLE IF NOT EXISTS pr_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pr_id UUID REFERENCES tracked_prs(id) ON DELETE CASCADE UNIQUE,
  summary_json JSONB NOT NULL,
  generated_at TIMESTAMP
);
