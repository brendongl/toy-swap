-- ToySwap Database Schema
-- Migration 002: Row Level Security Policies

-- =============================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================

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

-- =============================================
-- USERS TABLE POLICIES
-- =============================================

-- Users can view all user profiles (for browsing)
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (during signup)
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =============================================
-- CHILDREN TABLE POLICIES
-- =============================================

-- Users can view their own children
CREATE POLICY "Users can view own children"
  ON children FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can insert their own children
CREATE POLICY "Users can insert own children"
  ON children FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own children
CREATE POLICY "Users can update own children"
  ON children FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own children
CREATE POLICY "Users can delete own children"
  ON children FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- =============================================
-- TOYS TABLE POLICIES
-- =============================================

-- Users can view available toys from others
CREATE POLICY "Users can view available toys"
  ON toys FOR SELECT
  TO authenticated
  USING (
    (is_available = TRUE AND deleted_at IS NULL)
    OR user_id = auth.uid()
  );

-- Users can insert their own toys
CREATE POLICY "Users can insert own toys"
  ON toys FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own toys
CREATE POLICY "Users can update own toys"
  ON toys FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can delete (soft delete) their own toys
CREATE POLICY "Users can delete own toys"
  ON toys FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- =============================================
-- SWIPES TABLE POLICIES
-- =============================================

-- Users can view their own swipes
CREATE POLICY "Users can view own swipes"
  ON swipes FOR SELECT
  TO authenticated
  USING (swiper_id = auth.uid() OR toy_owner_id = auth.uid());

-- Users can insert their own swipes
CREATE POLICY "Users can insert own swipes"
  ON swipes FOR INSERT
  TO authenticated
  WITH CHECK (swiper_id = auth.uid());

-- =============================================
-- MATCHES TABLE POLICIES
-- =============================================

-- Users can view matches they're part of
CREATE POLICY "Users can view own matches"
  ON matches FOR SELECT
  TO authenticated
  USING (user_a_id = auth.uid() OR user_b_id = auth.uid());

-- Users can update matches they're part of
CREATE POLICY "Users can update own matches"
  ON matches FOR UPDATE
  TO authenticated
  USING (user_a_id = auth.uid() OR user_b_id = auth.uid())
  WITH CHECK (user_a_id = auth.uid() OR user_b_id = auth.uid());

-- =============================================
-- SWAP PROPOSALS TABLE POLICIES
-- =============================================

-- Users can view proposals they're involved in
CREATE POLICY "Users can view own proposals"
  ON swap_proposals FOR SELECT
  TO authenticated
  USING (proposer_id = auth.uid() OR recipient_id = auth.uid());

-- Users can create proposals for their matches
CREATE POLICY "Users can create proposals"
  ON swap_proposals FOR INSERT
  TO authenticated
  WITH CHECK (proposer_id = auth.uid());

-- Users can update proposals they're involved in
CREATE POLICY "Users can update own proposals"
  ON swap_proposals FOR UPDATE
  TO authenticated
  USING (proposer_id = auth.uid() OR recipient_id = auth.uid())
  WITH CHECK (proposer_id = auth.uid() OR recipient_id = auth.uid());

-- =============================================
-- SWAPS TABLE POLICIES
-- =============================================

-- Users can view swaps they're part of
CREATE POLICY "Users can view own swaps"
  ON swaps FOR SELECT
  TO authenticated
  USING (user_a_id = auth.uid() OR user_b_id = auth.uid());

-- Users can update swaps they're part of (for confirmation)
CREATE POLICY "Users can update own swaps"
  ON swaps FOR UPDATE
  TO authenticated
  USING (user_a_id = auth.uid() OR user_b_id = auth.uid())
  WITH CHECK (user_a_id = auth.uid() OR user_b_id = auth.uid());

-- =============================================
-- MESSAGES TABLE POLICIES
-- =============================================

-- Users can view messages for their swaps
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Users can send messages
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

-- Users can mark messages as read
CREATE POLICY "Users can update message read status"
  ON messages FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid())
  WITH CHECK (recipient_id = auth.uid());

-- =============================================
-- REPORTS TABLE POLICIES
-- =============================================

-- Users can view their own reports
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (reporter_id = auth.uid());

-- Users can create reports
CREATE POLICY "Users can create reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (reporter_id = auth.uid());

-- =============================================
-- RATINGS TABLE POLICIES
-- =============================================

-- Users can view ratings for users
CREATE POLICY "Users can view ratings"
  ON ratings FOR SELECT
  TO authenticated
  USING (TRUE);

-- Users can create ratings for completed swaps
CREATE POLICY "Users can create ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (rater_id = auth.uid());

-- =============================================
-- BLOCKED USERS TABLE POLICIES
-- =============================================

-- Users can view their own blocked list
CREATE POLICY "Users can view own blocked list"
  ON blocked_users FOR SELECT
  TO authenticated
  USING (blocker_id = auth.uid());

-- Users can block other users
CREATE POLICY "Users can block users"
  ON blocked_users FOR INSERT
  TO authenticated
  WITH CHECK (blocker_id = auth.uid());

-- Users can unblock users
CREATE POLICY "Users can unblock users"
  ON blocked_users FOR DELETE
  TO authenticated
  USING (blocker_id = auth.uid());
