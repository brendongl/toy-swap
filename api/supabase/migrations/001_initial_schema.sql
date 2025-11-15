-- ToySwap Database Schema
-- Migration 001: Initial Schema

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_phone ON users(phone_number) WHERE deleted_at IS NULL;

-- =============================================
-- CHILDREN TABLE
-- =============================================
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  age_range VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_children_user_id ON children(user_id);

-- =============================================
-- TOYS TABLE
-- =============================================
CREATE TABLE toys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  age_range VARCHAR(20) NOT NULL,
  condition VARCHAR(20) NOT NULL,
  brand VARCHAR(100),
  original_price VARCHAR(50),
  is_available BOOLEAN DEFAULT TRUE,
  photos JSONB,
  swipe_count INTEGER DEFAULT 0,
  match_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_toys_user_id ON toys(user_id);
CREATE INDEX idx_toys_available ON toys(is_available) WHERE deleted_at IS NULL;
CREATE INDEX idx_toys_age_range ON toys(age_range);

-- =============================================
-- SWIPES TABLE
-- =============================================
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swiper_id UUID REFERENCES users(id) ON DELETE CASCADE,
  toy_id UUID REFERENCES toys(id) ON DELETE CASCADE,
  toy_owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  direction VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(swiper_id, toy_id)
);

CREATE INDEX idx_swipes_swiper_id ON swipes(swiper_id);
CREATE INDEX idx_swipes_toy_owner_id ON swipes(toy_owner_id);
CREATE INDEX idx_swipes_direction ON swipes(direction);

-- =============================================
-- MATCHES TABLE
-- =============================================
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  expired_at TIMESTAMP,

  UNIQUE(user_a_id, user_b_id),
  CHECK (user_a_id < user_b_id)
);

CREATE INDEX idx_matches_users ON matches(user_a_id, user_b_id);
CREATE INDEX idx_matches_status ON matches(status);

-- =============================================
-- SWAP PROPOSALS TABLE
-- =============================================
CREATE TABLE swap_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  proposer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  offered_toy_id UUID REFERENCES toys(id) ON DELETE CASCADE,
  requested_toy_id UUID REFERENCES toys(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  round_number INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP,
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '48 hours'
);

CREATE INDEX idx_proposals_match_id ON swap_proposals(match_id);
CREATE INDEX idx_proposals_recipient_id ON swap_proposals(recipient_id);
CREATE INDEX idx_proposals_status ON swap_proposals(status);

-- =============================================
-- SWAPS TABLE
-- =============================================
CREATE TABLE swaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_a_toy_id UUID REFERENCES toys(id) ON DELETE SET NULL,
  user_b_toy_id UUID REFERENCES toys(id) ON DELETE SET NULL,
  swap_code VARCHAR(6) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'confirmed',
  user_a_confirmed BOOLEAN DEFAULT FALSE,
  user_b_confirmed BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_swaps_status ON swaps(status);
CREATE INDEX idx_swaps_user_a ON swaps(user_a_id);
CREATE INDEX idx_swaps_user_b ON swaps(user_b_id);
CREATE INDEX idx_swaps_code ON swaps(swap_code);

-- =============================================
-- MESSAGES TABLE
-- =============================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- =============================================
-- REPORTS TABLE
-- =============================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  swap_id UUID REFERENCES swaps(id) ON DELETE SET NULL,
  reason VARCHAR(50) NOT NULL,
  details TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
CREATE INDEX idx_reports_status ON reports(status);

-- =============================================
-- RATINGS TABLE
-- =============================================
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swap_id UUID REFERENCES swaps(id) ON DELETE CASCADE,
  rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rated_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(swap_id, rater_id),
  CHECK (score >= 1 AND score <= 5)
);

CREATE INDEX idx_ratings_rated_user ON ratings(rated_user_id);

-- =============================================
-- BLOCKED USERS TABLE
-- =============================================
CREATE TABLE blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blocked_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(blocker_id, blocked_user_id)
);

CREATE INDEX idx_blocked_blocker_id ON blocked_users(blocker_id);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for toys table
CREATE TRIGGER update_toys_updated_at
  BEFORE UPDATE ON toys
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for swaps table
CREATE TRIGGER update_swaps_updated_at
  BEFORE UPDATE ON swaps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate swap code
CREATE OR REPLACE FUNCTION generate_swap_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    SELECT EXISTS(SELECT 1 FROM swaps WHERE swap_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE users IS 'User accounts and profiles';
COMMENT ON TABLE children IS 'Children associated with user accounts';
COMMENT ON TABLE toys IS 'Toys listed by users for swapping';
COMMENT ON TABLE swipes IS 'User swipes on toys (like/dislike)';
COMMENT ON TABLE matches IS 'Matched users who liked each others toys';
COMMENT ON TABLE swap_proposals IS 'Specific toy swap proposals between matched users';
COMMENT ON TABLE swaps IS 'Confirmed swaps between users';
COMMENT ON TABLE messages IS 'Chat messages between users for a swap';
COMMENT ON TABLE reports IS 'User reports for safety issues';
COMMENT ON TABLE ratings IS 'User ratings after completed swaps';
COMMENT ON TABLE blocked_users IS 'Blocked users list';
