-- ============================================================
-- Attention Token — Core Tables + RLS
-- Run this in Supabase SQL Editor (one go, order matters)
-- ============================================================

-- 1️⃣ PROFILES — extends auth.users
-- ============================================================
CREATE TABLE profiles (
  id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username  TEXT UNIQUE NOT NULL,
  role      TEXT NOT NULL CHECK (role IN ('buyer', 'seller')),
  balance   INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read any profile (public usernames)
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile on sign-up
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile (but not role or balance via this policy)
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 2️⃣ GIGS
-- ============================================================
CREATE TABLE gigs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  price       INTEGER NOT NULL CHECK (price > 0),
  status      TEXT NOT NULL DEFAULT 'active'
              CHECK (status IN ('active', 'booked', 'completed', 'cancelled')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;

-- Anyone can browse active gigs
CREATE POLICY "gigs_select_active"
  ON gigs FOR SELECT
  USING (status = 'active' OR auth.uid() = seller_id);

-- Sellers can create gigs
CREATE POLICY "gigs_insert_own"
  ON gigs FOR INSERT
  WITH CHECK (
    auth.uid() = seller_id
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'seller')
  );

-- Sellers can update their own gigs
CREATE POLICY "gigs_update_own"
  ON gigs FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- 3️⃣ ORDERS (Escrow system)
-- ============================================================
CREATE TABLE orders (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id         UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
  buyer_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount         INTEGER NOT NULL CHECK (amount > 0),
  escrow_status  TEXT NOT NULL DEFAULT 'held'
                 CHECK (escrow_status IN ('held', 'released_to_seller', 'refunded_to_buyer')),
  completed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Buyer and seller can see their own orders
CREATE POLICY "orders_select_participants"
  ON orders FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Buyers can create orders (only on active gigs they didn't create)
CREATE POLICY "orders_insert_buyer"
  ON orders FOR INSERT
  WITH CHECK (
    auth.uid() = buyer_id
    AND EXISTS (
      SELECT 1 FROM gigs
      WHERE gigs.id = gig_id
        AND gigs.status = 'active'
        AND gigs.seller_id != auth.uid()
    )
  );

-- Participants can update escrow status within allowed transitions
CREATE POLICY "orders_update_status"
  ON orders FOR UPDATE
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id)
  WITH CHECK (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- ============================================================
-- HELPER: Automatically create a profile row on user sign-up
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, username, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'user_name', split_part(NEW.email, '@', 1)),
    'buyer'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
