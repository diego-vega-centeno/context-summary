DO $$ BEGIN
  CREATE TYPE work_item_status AS ENUM ('open', 'closed', 'merged', 'stale');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE oauth_provider_type AS ENUM ('google', 'github');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE work_item_type AS ENUM ('pull', 'issues');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE work_provider AS ENUM ('github', 'jira');
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  stale_days INTEGER DEFAULT 7
);

CREATE TABLE IF NOT EXISTS tracked_work_items(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider work_provider NOT NULL,
  work_item_type work_item_type NOT NULL,
  owner TEXT NOT NULL,
  container TEXT NOT NULL,
  external_id TEXT NOT NULL,
  title TEXT NOT NULL,
  status work_item_status NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP,
  last_activity_at TIMESTAMP,
  last_synced_at TIMESTAMP,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (user_id, provider, owner, container, external_id)
);

CREATE TABLE IF NOT EXISTS work_item_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_item_id UUID REFERENCES tracked_work_items(id) ON DELETE CASCADE UNIQUE,
  summary_json JSONB NOT NULL,
  generated_at TIMESTAMP
);
