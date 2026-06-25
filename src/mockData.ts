import type { User, Toy, Match, Message, Swipe, SwapProposal } from './store'

export const DEMO_USER_ID = 'user-demo'

export const mockUsers: User[] = [
  { id: DEMO_USER_ID, name: 'Brendon G.', email: 'demo@toyswap.com', district: 'District 2', trust_score: 4.0, swaps_completed: 2, is_onboarded: true, profile_photo_url: 'https://picsum.photos/seed/demo/200/200', children_ages: ['1-3yr', '3-5yr'] },
  { id: 'user-sarah', name: 'Sarah M.', email: 'sarah@example.com', district: 'District 2', trust_score: 4.5, swaps_completed: 3, is_onboarded: true, profile_photo_url: 'https://picsum.photos/seed/sarah/200/200', children_ages: ['0-1yr', '1-3yr'] },
  { id: 'user-james', name: 'James T.', email: 'james@example.com', district: 'District 2', trust_score: 4.0, swaps_completed: 2, is_onboarded: true, profile_photo_url: 'https://picsum.photos/seed/james/200/200', children_ages: ['3-5yr'] },
  { id: 'user-linh', name: 'Linh N.', email: 'linh@example.com', district: 'District 7', trust_score: 3.5, swaps_completed: 1, is_onboarded: true, profile_photo_url: 'https://picsum.photos/seed/linh/200/200', children_ages: ['1-3yr', '3-5yr'] },
  { id: 'user-mike', name: 'Mike R.', email: 'mike@example.com', district: 'District 2', trust_score: 5.0, swaps_completed: 8, is_onboarded: true, profile_photo_url: 'https://picsum.photos/seed/mike/200/200', children_ages: ['5-8yr'] },
  { id: 'user-thu', name: 'Thu H.', email: 'thu@example.com', district: 'District 2', trust_score: 3.0, swaps_completed: 0, is_onboarded: true, profile_photo_url: 'https://picsum.photos/seed/thu/200/200', children_ages: ['0-1yr'] },
  { id: 'user-anna', name: 'Anna K.', email: 'anna@example.com', district: 'Binh Thanh', trust_score: 4.2, swaps_completed: 4, is_onboarded: true, profile_photo_url: 'https://picsum.photos/seed/anna/200/200', children_ages: ['3-5yr', '5-8yr'] },
]

export const mockToys: Toy[] = [
  // Demo user's toys
  { id: 'toy-d1', user_id: DEMO_USER_ID, title: 'Fisher-Price Laugh & Learn', description: 'Interactive learning toy with lights and sounds. Great for toddlers!', age_range: '0-1yr', condition: 'good', brand: 'Fisher-Price', photos: ['https://picsum.photos/seed/toy1/400/400', 'https://picsum.photos/seed/toy1b/400/400'], is_available: true },
  { id: 'toy-d2', user_id: DEMO_USER_ID, title: 'Wooden Stacking Rings', description: 'Classic wooden stacking toy, all natural materials.', age_range: '0-1yr', condition: 'like_new', brand: 'Hape', photos: ['https://picsum.photos/seed/toy2/400/400'], is_available: true },
  { id: 'toy-d3', user_id: DEMO_USER_ID, title: 'Duplo My First Number Train', description: 'LEGO Duplo train with number blocks. Missing one block but otherwise complete.', age_range: '1-3yr', condition: 'good', brand: 'LEGO', photos: ['https://picsum.photos/seed/toy3/400/400'], is_available: true },
  { id: 'toy-d4', user_id: DEMO_USER_ID, title: 'Melissa & Doug Puzzle Bundle', description: '4 wooden puzzles - animals, vehicles, shapes, numbers.', age_range: '1-3yr', condition: 'like_new', brand: 'Melissa & Doug', photos: ['https://picsum.photos/seed/toy4/400/400'], is_available: false },

  // Sarah's toys
  { id: 'toy-s1', user_id: 'user-sarah', title: 'LEGO Duplo Train Set', description: 'Complete train set with tracks, station, and figures. My toddler loved this!', age_range: '1-3yr', condition: 'like_new', brand: 'LEGO', photos: ['https://picsum.photos/seed/lego1/400/400', 'https://picsum.photos/seed/lego1b/400/400'], is_available: true },
  { id: 'toy-s2', user_id: 'user-sarah', title: 'Baby Einstein Activity Table', description: 'Musical activity table with multiple stations. Batteries included!', age_range: '0-1yr', condition: 'good', brand: 'Baby Einstein', photos: ['https://picsum.photos/seed/baby1/400/400'], is_available: true },
  { id: 'toy-s3', user_id: 'user-sarah', title: 'Soft Fabric Books Set (5)', description: 'Crinkly fabric books for babies. Machine washable.', age_range: '0-1yr', condition: 'like_new', brand: 'Jellycat', photos: ['https://picsum.photos/seed/book1/400/400'], is_available: true },

  // James's toys
  { id: 'toy-j1', user_id: 'user-james', title: 'Bluey Family House Playset', description: 'Complete Bluey house with all furniture and figures!', age_range: '3-5yr', condition: 'like_new', brand: 'Moose Toys', photos: ['https://picsum.photos/seed/bluey1/400/400', 'https://picsum.photos/seed/bluey1b/400/400'], is_available: true },
  { id: 'toy-j2', user_id: 'user-james', title: 'Play Kitchen Set', description: 'Wooden play kitchen with pots, pans, and food. A bit worn but lots of fun.', age_range: '3-5yr', condition: 'fair', brand: 'KidKraft', photos: ['https://picsum.photos/seed/kitchen1/400/400'], is_available: true },
  { id: 'toy-j3', user_id: 'user-james', title: 'PAW Patrol Lookout Tower', description: 'The big lookout tower with Chase figure. Lights and sounds work.', age_range: '3-5yr', condition: 'good', brand: 'Spin Master', photos: ['https://picsum.photos/seed/paw1/400/400'], is_available: true },

  // Linh's toys
  { id: 'toy-l1', user_id: 'user-linh', title: 'Wooden Building Blocks (80pc)', description: 'Natural wood blocks in various shapes. Perfect for creative play.', age_range: '1-3yr', condition: 'good', brand: 'Hape', photos: ['https://picsum.photos/seed/blocks1/400/400'], is_available: true },
  { id: 'toy-l2', user_id: 'user-linh', title: 'Magna-Tiles 100 Piece Set', description: 'Magnetic building tiles. All pieces included, great condition!', age_range: '3-5yr', condition: 'like_new', brand: 'Magna-Tiles', photos: ['https://picsum.photos/seed/magna1/400/400', 'https://picsum.photos/seed/magna1b/400/400'], is_available: true },
  { id: 'toy-l3', user_id: 'user-linh', title: 'VTech Sit-to-Stand Walker', description: 'Activity walker, helped my daughter learn to walk!', age_range: '0-1yr', condition: 'fair', brand: 'VTech', photos: ['https://picsum.photos/seed/vtech1/400/400'], is_available: true },

  // Mike's toys
  { id: 'toy-m1', user_id: 'user-mike', title: 'Hot Wheels Track Builder', description: 'Massive track set with loops and launcher. Includes 10 cars.', age_range: '5-8yr', condition: 'good', brand: 'Hot Wheels', photos: ['https://picsum.photos/seed/hw1/400/400', 'https://picsum.photos/seed/hw1b/400/400'], is_available: true },
  { id: 'toy-m2', user_id: 'user-mike', title: 'LEGO City Fire Station', description: 'Complete set #60320. Built once, all pieces accounted for.', age_range: '5-8yr', condition: 'like_new', brand: 'LEGO', photos: ['https://picsum.photos/seed/legocity1/400/400'], is_available: true },
  { id: 'toy-m3', user_id: 'user-mike', title: 'Nerf Elite 2.0 Commander', description: 'Foam dart blaster with 20 darts. Great for outdoor play!', age_range: '8+', condition: 'good', brand: 'Nerf', photos: ['https://picsum.photos/seed/nerf1/400/400'], is_available: true },

  // Thu's toys
  { id: 'toy-t1', user_id: 'user-thu', title: 'Sophie la Girafe', description: 'Classic teething toy, sanitized and ready for a new baby!', age_range: '0-1yr', condition: 'good', brand: 'Vulli', photos: ['https://picsum.photos/seed/sophie1/400/400'], is_available: true },
  { id: 'toy-t2', user_id: 'user-thu', title: 'Baby Gym Play Mat', description: 'Soft play mat with hanging toys and mirror. Like new!', age_range: '0-1yr', condition: 'like_new', brand: 'Skip Hop', photos: ['https://picsum.photos/seed/gym1/400/400'], is_available: true },

  // Anna's toys
  { id: 'toy-a1', user_id: 'user-anna', title: 'Melissa & Doug Puzzle Set', description: '6 wooden puzzles in a rack. Animals, vehicles, and shapes.', age_range: '1-3yr', condition: 'like_new', brand: 'Melissa & Doug', photos: ['https://picsum.photos/seed/puzzle1/400/400'], is_available: true },
  { id: 'toy-a2', user_id: 'user-anna', title: 'Playmobil Pirate Ship', description: 'Large pirate ship with crew, cannons, and treasure.', age_range: '5-8yr', condition: 'good', brand: 'Playmobil', photos: ['https://picsum.photos/seed/pirate1/400/400'], is_available: true },
  { id: 'toy-a3', user_id: 'user-anna', title: 'Kinetic Sand Set', description: 'Purple kinetic sand with molds and tools. So satisfying!', age_range: '3-5yr', condition: 'good', brand: 'Spin Master', photos: ['https://picsum.photos/seed/sand1/400/400'], is_available: true },
]

// Pre-seeded: Sarah and Mike swiped right on demo user's toys
export const mockSwipes: Swipe[] = [
  { id: 'sw-1', swiper_id: 'user-sarah', toy_id: 'toy-d1', toy_owner_id: DEMO_USER_ID, direction: 'right' },
  { id: 'sw-2', swiper_id: 'user-sarah', toy_id: 'toy-d2', toy_owner_id: DEMO_USER_ID, direction: 'right' },
  { id: 'sw-3', swiper_id: 'user-mike', toy_id: 'toy-d3', toy_owner_id: DEMO_USER_ID, direction: 'right' },
  { id: 'sw-4', swiper_id: 'user-james', toy_id: 'toy-d1', toy_owner_id: DEMO_USER_ID, direction: 'right' },
  // Demo user already swiped on some
  { id: 'sw-5', swiper_id: DEMO_USER_ID, toy_id: 'toy-s1', toy_owner_id: 'user-sarah', direction: 'right' },
  { id: 'sw-6', swiper_id: DEMO_USER_ID, toy_id: 'toy-m1', toy_owner_id: 'user-mike', direction: 'right' },
]

export const mockMatches: Match[] = [
  { id: 'match-1', user_a_id: DEMO_USER_ID, user_b_id: 'user-sarah', status: 'active', created_at: '2026-02-16T10:30:00Z' },
  { id: 'match-2', user_a_id: DEMO_USER_ID, user_b_id: 'user-mike', status: 'active', created_at: '2026-02-15T14:00:00Z' },
]

export const mockSwapProposals: SwapProposal[] = [
  { id: 'prop-1', match_id: 'match-1', proposer_id: 'user-sarah', offered_toy_id: 'toy-s2', requested_toy_id: 'toy-d1', status: 'pending', round_number: 1 },
]

export const mockMessages: Message[] = [
  { id: 'msg-1', match_id: 'match-1', sender_id: 'user-sarah', content: 'Hey! Love your Fisher-Price toy 😍 My little one would love it!', created_at: '2026-02-16T10:35:00Z' },
  { id: 'msg-2', match_id: 'match-1', sender_id: DEMO_USER_ID, content: 'Thanks Sarah! Your Duplo Train Set looks amazing too! 🚂', created_at: '2026-02-16T10:40:00Z' },
  { id: 'msg-3', match_id: 'match-1', sender_id: 'user-sarah', content: 'Want to swap? I proposed my Baby Einstein table for your Fisher-Price!', created_at: '2026-02-16T11:00:00Z' },
  { id: 'msg-4', match_id: 'match-1', sender_id: DEMO_USER_ID, content: 'Sounds great! Let\'s do it 🎉', created_at: '2026-02-16T11:05:00Z' },
  { id: 'msg-5', match_id: 'match-1', sender_id: 'user-sarah', content: '📍 How about Starbucks Thao Dien this Saturday?', created_at: '2026-02-16T11:10:00Z' },
  { id: 'msg-6', match_id: 'match-1', sender_id: DEMO_USER_ID, content: 'Perfect! See you there!', created_at: '2026-02-16T11:15:00Z' },
  { id: 'msg-7', match_id: 'match-2', sender_id: 'user-mike', content: 'Hey! That Duplo train would be perfect for my nephew. Interested in swapping?', created_at: '2026-02-15T14:10:00Z' },
  { id: 'msg-8', match_id: 'match-2', sender_id: DEMO_USER_ID, content: 'Sure! What do you have in mind? 🤔', created_at: '2026-02-15T14:15:00Z' },
]
