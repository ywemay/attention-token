-- ============================================================
-- Attention Token v2 — Creator Attention Marketplace
-- Run this in Supabase SQL Editor. Drops old schema first.
-- ============================================================

-- ⚠️ DROP old tables (safe order to respect FKs)
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS gigs CASCADE;

-- ============================================================
-- 1️⃣ CREATORS
-- ============================================================
CREATE TABLE creators (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_name  TEXT NOT NULL,
  channel_url   TEXT NOT NULL,
  platform_type TEXT NOT NULL CHECK (platform_type IN ('youtube', 'twitter', 'tiktok', 'instagram', 'blog', 'other')),
  owner_id      UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE creators ENABLE ROW LEVEL SECURITY;

-- Anyone can read creators
CREATE POLICY "creators_select_all"
  ON creators FOR SELECT
  USING (true);

-- Authenticated users can create
CREATE POLICY "creators_insert_auth"
  ON creators FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- 2️⃣ TASKS (strictly typed attention actions)
-- ============================================================
CREATE TABLE tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id    UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  task_type     TEXT NOT NULL CHECK (task_type IN ('subscribe', 'comment', 'blog_post')),
  reward_amount INTEGER NOT NULL CHECK (reward_amount > 0),
  instructions  TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'completed')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Anyone can browse open tasks
CREATE POLICY "tasks_select_open"
  ON tasks FOR SELECT
  USING (true);

-- Creator owners can manage
CREATE POLICY "tasks_insert_owner"
  ON tasks FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "tasks_update_owner"
  ON tasks FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- 3️⃣ SUBMISSIONS (proof of completed attention actions)
-- ============================================================
CREATE TABLE submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  task_id     UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  proof_url   TEXT,  -- NULL for 'subscribe' tasks (confirmation-based)
  status      TEXT NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Users see own submissions; creators see submissions for their tasks
CREATE POLICY "submissions_select_participant"
  ON submissions FOR SELECT
  USING (
    auth.uid() = user_id
    OR auth.uid() IN (
      SELECT c.owner_id FROM creators c
      JOIN tasks t ON t.creator_id = c.id
      WHERE t.id = task_id
    )
  );

-- Logged-in users can submit
CREATE POLICY "submissions_insert_auth"
  ON submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_tasks_type_status ON tasks (task_type, status);
CREATE INDEX idx_tasks_creator ON tasks (creator_id);
CREATE INDEX idx_submissions_user ON submissions (user_id);
CREATE INDEX idx_submissions_task ON submissions (task_id);
