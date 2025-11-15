/**
 * Database Types - Matches PostgreSQL schema from implementation plan
 */

export interface User {
  id: string;
  phone_number?: string;
  email?: string;
  name: string;
  profile_photo_url?: string;
  district: string;
  location?: {
    lat: number;
    lng: number;
  };
  bio?: string;
  trust_score: number;
  completed_swaps_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Child {
  id: string;
  user_id: string;
  age_range: AgeRange;
  created_at: string;
}

export type AgeRange = '0-1yr' | '1-3yr' | '3-5yr' | '5-8yr' | '8+';
export type ToyCondition = 'Like New' | 'Good' | 'Fair' | 'Well-Loved';

export interface Toy {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  age_range: AgeRange;
  condition: ToyCondition;
  brand?: string;
  original_price?: string;
  is_available: boolean;
  photos: string[];
  swipe_count: number;
  match_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  // Joined data
  user?: User;
}

export type SwipeDirection = 'right' | 'left';

export interface Swipe {
  id: string;
  swiper_id: string;
  toy_id: string;
  toy_owner_id: string;
  direction: SwipeDirection;
  created_at: string;
}

export type MatchStatus = 'active' | 'negotiating' | 'expired' | 'completed';

export interface Match {
  id: string;
  user_a_id: string;
  user_b_id: string;
  status: MatchStatus;
  created_at: string;
  expired_at?: string;
  // Joined data
  user_a?: User;
  user_b?: User;
  toys_i_liked?: Toy[];
  toys_they_liked?: Toy[];
}

export type ProposalStatus = 'pending' | 'accepted' | 'countered' | 'declined';

export interface SwapProposal {
  id: string;
  match_id: string;
  proposer_id: string;
  recipient_id: string;
  offered_toy_id: string;
  requested_toy_id: string;
  status: ProposalStatus;
  round_number: number;
  created_at: string;
  responded_at?: string;
  expires_at: string;
  // Joined data
  proposer?: User;
  recipient?: User;
  offered_toy?: Toy;
  requested_toy?: Toy;
}

export type SwapStatus = 'confirmed' | 'completed' | 'cancelled';

export interface Swap {
  id: string;
  match_id?: string;
  user_a_id: string;
  user_b_id: string;
  user_a_toy_id?: string;
  user_b_toy_id?: string;
  swap_code: string;
  status: SwapStatus;
  user_a_confirmed: boolean;
  user_b_confirmed: boolean;
  confirmed_at?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  user_a?: User;
  user_b?: User;
  user_a_toy?: Toy;
  user_b_toy?: Toy;
}

export interface Message {
  id: string;
  swap_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  read: boolean;
  created_at: string;
  // Joined data
  sender?: User;
}

export type ReportReason = 'no_show' | 'rude' | 'misleading_photos' | 'other';
export type ReportStatus = 'pending' | 'reviewed' | 'resolved';

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  swap_id?: string;
  reason: ReportReason;
  details?: string;
  status: ReportStatus;
  created_at: string;
}

export interface Rating {
  id: string;
  swap_id: string;
  rater_id: string;
  rated_user_id: string;
  score: number; // 1-5
  feedback?: string;
  created_at: string;
}

export interface BlockedUser {
  id: string;
  blocker_id: string;
  blocked_user_id: string;
  created_at: string;
}

// Districts in HCMC
export const DISTRICTS = [
  'District 1',
  'District 2',
  'District 3',
  'District 4',
  'District 5',
  'District 6',
  'District 7',
  'District 8',
  'District 9',
  'District 10',
  'District 11',
  'District 12',
  'Binh Thanh',
  'Go Vap',
  'Phu Nhuan',
  'Tan Binh',
  'Tan Phu',
  'Thu Duc',
] as const;

export type District = typeof DISTRICTS[number];
