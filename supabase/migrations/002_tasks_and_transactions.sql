-- ============================================================
-- Attention Token — Tables: tasks & transactions
-- Run after tables.sql (which creates profiles, gigs, orders)
-- ============================================================

-- 4️⃣ TASKS (published by sellers, browsed in marketplace)
-- ============================================================
CREATE TABLE tasks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  price       INTEGER NOT NULL CHECK (price > 0),
  tags        TEXT[] DEFAULT '{}',
  status      TEXT NOT NULL DEFAULT 'active'
              CHECK (status IN ('active', 'in_progress', 'completed', 'cancelled')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Anyone can browse active tasks
CREATE POLICY "tasks_select_active"
  ON tasks FOR SELECT
  USING (status = 'active' OR auth.uid() = seller_id);

-- Sellers only can create tasks
CREATE POLICY "tasks_insert_seller"
  ON tasks FOR INSERT
  WITH CHECK (
    auth.uid() = seller_id
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'seller')
  );

-- Sellers update their own tasks
CREATE POLICY "tasks_update_own"
  ON tasks FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- 5️⃣ TRANSACTIONS (ledger for token movements)
-- ============================================================
CREATE TABLE transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('earned', 'spent')),
  description TEXT NOT NULL,
  amount      INTEGER NOT NULL,
  ref_type    TEXT,  -- 'task', 'gig', 'order', 'referral', 'reward'
  ref_id      UUID,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users see only their own transactions
CREATE POLICY "transactions_select_own"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- System insert (will be used by functions later)
CREATE POLICY "transactions_insert_system"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- Create index for fast balance lookups
CREATE INDEX idx_transactions_user ON transactions (user_id, created_at DESC);
CREATE INDEX idx_tasks_status ON tasks (status);
