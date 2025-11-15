-- Database Functions for ToySwap
-- These functions provide helper utilities for common operations

-- Function to increment swipe count on a toy
CREATE OR REPLACE FUNCTION increment_swipe_count(toy_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE toys
  SET swipe_count = swipe_count + 1
  WHERE id = toy_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment match count on a toy
CREATE OR REPLACE FUNCTION increment_match_count(toy_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE toys
  SET match_count = match_count + 1
  WHERE id = toy_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user trust score
CREATE OR REPLACE FUNCTION update_trust_score(
  user_id UUID,
  score_change DECIMAL
)
RETURNS VOID AS $$
BEGIN
  UPDATE users
  SET trust_score = GREATEST(0, LEAST(5, trust_score + score_change))
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to complete a swap (called when both users confirm)
CREATE OR REPLACE FUNCTION complete_swap(swap_id UUID, confirming_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  swap_record RECORD;
  both_confirmed BOOLEAN;
BEGIN
  -- Get the swap record
  SELECT * INTO swap_record FROM swaps WHERE id = swap_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Swap not found';
  END IF;

  -- Update confirmation for the user
  IF confirming_user_id = swap_record.user_a_id THEN
    UPDATE swaps SET user_a_confirmed = TRUE WHERE id = swap_id;
  ELSIF confirming_user_id = swap_record.user_b_id THEN
    UPDATE swaps SET user_b_confirmed = TRUE WHERE id = swap_id;
  ELSE
    RAISE EXCEPTION 'User not part of this swap';
  END IF;

  -- Check if both users have confirmed
  SELECT user_a_confirmed AND user_b_confirmed INTO both_confirmed
  FROM swaps WHERE id = swap_id;

  -- If both confirmed, mark swap as completed
  IF both_confirmed THEN
    UPDATE swaps
    SET status = 'completed', confirmed_at = NOW()
    WHERE id = swap_id;

    -- Increment completed swaps count for both users
    UPDATE users
    SET completed_swaps_count = completed_swaps_count + 1
    WHERE id IN (swap_record.user_a_id, swap_record.user_b_id);

    -- Update trust scores (positive feedback for completing swap)
    PERFORM update_trust_score(swap_record.user_a_id, 0.1);
    PERFORM update_trust_score(swap_record.user_b_id, 0.1);

    -- Mark toys as unavailable
    UPDATE toys
    SET is_available = FALSE
    WHERE id IN (swap_record.user_a_toy_id, swap_record.user_b_toy_id);

    RETURN jsonb_build_object('completed', true, 'both_confirmed', true);
  ELSE
    RETURN jsonb_build_object('completed', false, 'both_confirmed', false);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get nearby toys (using PostGIS for geolocation)
CREATE OR REPLACE FUNCTION get_nearby_toys(
  user_location GEOGRAPHY,
  max_distance_meters DOUBLE PRECISION DEFAULT 5000,
  excluded_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  toy_id UUID,
  distance_meters DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id AS toy_id,
    ST_Distance(u.location, user_location) AS distance_meters
  FROM toys t
  JOIN users u ON t.user_id = u.id
  WHERE
    t.is_available = TRUE
    AND t.deleted_at IS NULL
    AND ST_DWithin(u.location, user_location, max_distance_meters)
    AND (excluded_user_id IS NULL OR u.id != excluded_user_id)
  ORDER BY distance_meters ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if two users have a mutual match
CREATE OR REPLACE FUNCTION check_mutual_match(user_a UUID, user_b UUID)
RETURNS BOOLEAN AS $$
DECLARE
  mutual_swipes_count INTEGER;
BEGIN
  -- Check if both users have swiped right on each other's toys
  SELECT COUNT(*) INTO mutual_swipes_count
  FROM swipes s1
  JOIN swipes s2 ON s1.swiper_id = s2.toy_owner_id AND s1.toy_owner_id = s2.swiper_id
  WHERE s1.swiper_id = user_a
    AND s1.toy_owner_id = user_b
    AND s1.direction = 'right'
    AND s2.direction = 'right';

  RETURN mutual_swipes_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION increment_swipe_count TO authenticated;
GRANT EXECUTE ON FUNCTION increment_match_count TO authenticated;
GRANT EXECUTE ON FUNCTION update_trust_score TO authenticated;
GRANT EXECUTE ON FUNCTION complete_swap TO authenticated;
GRANT EXECUTE ON FUNCTION get_nearby_toys TO authenticated;
GRANT EXECUTE ON FUNCTION check_mutual_match TO authenticated;
