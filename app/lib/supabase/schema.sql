-- ToySwap Database Schema
-- This schema implements the complete database design from the implementation plan

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  name VARCHAR(100) NOT NULL,
  profile_photo_url TEXT,
  district VARCHAR(50) NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  bio TEXT,
  trust_score DECIMAL(3,2) DEFAULT 3.00,
  completed_swaps_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,

  CHECK (trust_score >= 0 AND trust_score <= 5)
);

CREATE INDEX idx_users_district ON users(district);
CREATE INDEX idx_users_location ON users USING GIST(location);
CREATE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL;
CREATE INDEX idx_users_phone ON users(phone_number) WHERE phone_number IS NOT NULL;

-- ============================================================================
-- CHILDREN TABLE
-- ============================================================================
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  age_range VARCHAR(20) NOT NULL CHECK (age_range IN ('0-1yr', '1-3yr', '3-5yr', '5-8yr', '8+')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_children_user_id ON children(user_id);

-- ============================================================================
-- TOYS TABLE
-- ============================================================================
CREATE TABLE toys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  age_range VARCHAR(20) NOT NULL CHECK (age_range IN ('0-1yr', '1-3yr', '3-5yr', '5-8yr', '8+')),
  condition VARCHAR(20) NOT NULL CHECK (condition IN ('Like New', 'Good', 'Fair', 'Well-Loved')),
  brand VARCHAR(100),
  original_price VARCHAR(50),
  is_available BOOLEAN DEFAULT TRUE,
  photos JSONB DEFAULT '[]'::jsonb,
  swipe_count INTEGER DEFAULT 0,
  match_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_toys_user_id ON toys(user_id);
CREATE INDEX idx_toys_available ON toys(is_available) WHERE deleted_at IS NULL;
CREATE INDEX idx_toys_age_range ON toys(age_range);
CREATE INDEX idx_toys_created_at ON toys(created_at DESC);

-- ============================================================================
-- SWIPES TABLE
-- ============================================================================
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  swiper_id UUID REFERENCES users(id) ON DELETE CASCADE,
  toy_id UUID REFERENCES toys(id) ON DELETE CASCADE,
  toy_owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  direction VARCHAR(10) NOT NULL CHECK (direction IN ('right', 'left')),
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(swiper_id, toy_id)
);

CREATE INDEX idx_swipes_swiper_id ON swipes(swiper_id);
CREATE INDEX idx_swipes_toy_owner_id ON swipes(toy_owner_id);
CREATE INDEX idx_swipes_direction ON swipes(direction);
CREATE INDEX idx_swipes_created_at ON swipes(created_at DESC);

-- ============================================================================
-- MATCHES TABLE
-- ============================================================================
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'negotiating', 'expired', 'completed')),
  created_at TIMESTAMP DEFAULT NOW(),
  expired_at TIMESTAMP,

  UNIQUE(user_a_id, user_b_id),
  CHECK (user_a_id < user_b_id)
);

CREATE INDEX idx_matches_users ON matches(user_a_id, user_b_id);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_created_at ON matches(created_at DESC);

-- ============================================================================
-- SWAP PROPOSALS TABLE
-- ============================================================================
CREATE TABLE swap_proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  proposer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  offered_toy_id UUID REFERENCES toys(id) ON DELETE CASCADE,
  requested_toy_id UUID REFERENCES toys(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'countered', 'declined')),
  round_number INTEGER DEFAULT 1 CHECK (round_number >= 1 AND round_number <= 3),
  created_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP,
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '48 hours'
);

CREATE INDEX idx_proposals_match_id ON swap_proposals(match_id);
CREATE INDEX idx_proposals_recipient_id ON swap_proposals(recipient_id);
CREATE INDEX idx_proposals_status ON swap_proposals(status);
CREATE INDEX idx_proposals_created_at ON swap_proposals(created_at DESC);

-- ============================================================================
-- SWAPS TABLE
-- ============================================================================
CREATE TABLE swaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_a_toy_id UUID REFERENCES toys(id) ON DELETE SET NULL,
  user_b_toy_id UUID REFERENCES toys(id) ON DELETE SET NULL,
  swap_code VARCHAR(6) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled')),
  user_a_confirmed BOOLEAN DEFAULT FALSE,
  user_b_confirmed BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_swaps_status ON swaps(status);
CREATE INDEX idx_swaps_user_a ON swaps(user_a_id);
CREATE INDEX idx_swaps_user_b ON swaps(user_b_id);
CREATE INDEX idx_swaps_swap_code ON swaps(swap_code);
CREATE INDEX idx_swaps_created_at ON swaps(created_at DESC);

-- ============================================================================
-- MESSAGES TABLE
-- ============================================================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  swap_id UUID REFERENCES swaps(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_swap_id ON messages(swap_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_read ON messages(read) WHERE read = FALSE;

-- ============================================================================
-- REPORTS TABLE
-- ============================================================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  swap_id UUID REFERENCES swaps(id) ON DELETE SET NULL,
  reason VARCHAR(50) NOT NULL CHECK (reason IN ('no_show', 'rude', 'misleading_photos', 'other')),
  details TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);

-- ============================================================================
-- RATINGS TABLE
-- ============================================================================
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  swap_id UUID REFERENCES swaps(id) ON DELETE CASCADE,
  rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rated_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(swap_id, rater_id)
);

CREATE INDEX idx_ratings_rated_user ON ratings(rated_user_id);
CREATE INDEX idx_ratings_swap_id ON ratings(swap_id);

-- ============================================================================
-- BLOCKED USERS TABLE
-- ============================================================================
CREATE TABLE blocked_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blocked_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(blocker_id, blocked_user_id)
);

CREATE INDEX idx_blocked_blocker_id ON blocked_users(blocker_id);
CREATE INDEX idx_blocked_user_id ON blocked_users(blocked_user_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_toys_updated_at BEFORE UPDATE ON toys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_swaps_updated_at BEFORE UPDATE ON swaps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE toys ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE swap_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE swaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_users ENABLE ROW LEVEL SECURITY;

-- Users: Can read all, update/delete own
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Children: Can only manage own children
CREATE POLICY "Users can view own children" ON children FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own children" ON children FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own children" ON children FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own children" ON children FOR DELETE USING (auth.uid() = user_id);

-- Toys: Can view available toys, manage own
CREATE POLICY "Users can view available toys" ON toys FOR SELECT USING (deleted_at IS NULL AND (is_available = true OR user_id = auth.uid()));
CREATE POLICY "Users can insert own toys" ON toys FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own toys" ON toys FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own toys" ON toys FOR DELETE USING (auth.uid() = user_id);

-- Swipes: Can view and create own swipes
CREATE POLICY "Users can view own swipes" ON swipes FOR SELECT USING (auth.uid() = swiper_id OR auth.uid() = toy_owner_id);
CREATE POLICY "Users can create swipes" ON swipes FOR INSERT WITH CHECK (auth.uid() = swiper_id);

-- Matches: Can view matches they're part of
CREATE POLICY "Users can view own matches" ON matches FOR SELECT USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Swap Proposals: Can view and create proposals they're part of
CREATE POLICY "Users can view relevant proposals" ON swap_proposals FOR SELECT USING (auth.uid() = proposer_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can create proposals" ON swap_proposals FOR INSERT WITH CHECK (auth.uid() = proposer_id);
CREATE POLICY "Users can update relevant proposals" ON swap_proposals FOR UPDATE USING (auth.uid() = recipient_id);

-- Swaps: Can view and manage swaps they're part of
CREATE POLICY "Users can view own swaps" ON swaps FOR SELECT USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);
CREATE POLICY "Users can update own swaps" ON swaps FOR UPDATE USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Messages: Can view and send messages in own swaps
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own received messages" ON messages FOR UPDATE USING (auth.uid() = recipient_id);

-- Reports: Can create and view own reports
CREATE POLICY "Users can view own reports" ON reports FOR SELECT USING (auth.uid() = reporter_id);
CREATE POLICY "Users can create reports" ON reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Ratings: Can view and create ratings for own swaps
CREATE POLICY "Users can view ratings" ON ratings FOR SELECT USING (auth.uid() = rater_id OR auth.uid() = rated_user_id);
CREATE POLICY "Users can create ratings" ON ratings FOR INSERT WITH CHECK (auth.uid() = rater_id);

-- Blocked Users: Can manage own blocks
CREATE POLICY "Users can view own blocks" ON blocked_users FOR SELECT USING (auth.uid() = blocker_id);
CREATE POLICY "Users can create blocks" ON blocked_users FOR INSERT WITH CHECK (auth.uid() = blocker_id);
CREATE POLICY "Users can delete own blocks" ON blocked_users FOR DELETE USING (auth.uid() = blocker_id);
