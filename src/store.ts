import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockUsers, mockToys, mockMatches, mockMessages, mockSwipes, mockSwapProposals } from './mockData'

export type AgeRange = '0-1yr' | '1-3yr' | '3-5yr' | '5-8yr' | '8+'
export type Condition = 'like_new' | 'good' | 'fair' | 'well_loved'

export interface User {
  id: string; name: string; email: string; district: string;
  trust_score: number; swaps_completed: number; is_onboarded: boolean;
  profile_photo_url: string; children_ages: AgeRange[];
}

export interface Toy {
  id: string; user_id: string; title: string; description: string;
  age_range: AgeRange; condition: Condition; brand: string;
  photos: string[]; is_available: boolean;
}

export interface Swipe {
  id: string; swiper_id: string; toy_id: string; toy_owner_id: string;
  direction: 'left' | 'right';
}

export interface Match {
  id: string; user_a_id: string; user_b_id: string; status: string;
  created_at: string;
}

export interface SwapProposal {
  id: string; match_id: string; proposer_id: string;
  offered_toy_id: string; requested_toy_id: string;
  status: 'pending' | 'accepted' | 'declined' | 'countered'; round_number: number;
}

export interface Message {
  id: string; match_id: string; sender_id: string; content: string; created_at: string;
}

interface AppState {
  currentUser: User | null
  users: User[]
  toys: Toy[]
  swipes: Swipe[]
  matches: Match[]
  swapProposals: SwapProposal[]
  messages: Message[]
  login: (email: string, password: string, name?: string, district?: string) => User
  logout: () => void
  completeOnboarding: (ages: AgeRange[]) => void
  addToy: (toy: Omit<Toy, 'id' | 'user_id' | 'is_available'>) => void
  updateToy: (id: string, updates: Partial<Toy>) => void
  deleteToy: (id: string) => void
  addSwipe: (toyId: string, toyOwnerId: string, direction: 'left' | 'right') => Match | null
  sendMessage: (matchId: string, content: string) => void
  createProposal: (matchId: string, offeredToyId: string, requestedToyId: string) => void
  respondToProposal: (proposalId: string, status: 'accepted' | 'declined') => void
  getUser: (id: string) => User | undefined
  getToy: (id: string) => Toy | undefined
  getMatchMessages: (matchId: string) => Message[]
  getMatchProposals: (matchId: string) => SwapProposal[]
  getUserToys: (userId: string) => Toy[]
  getBrowseToys: () => Toy[]
  getUserMatches: () => Match[]
  getMatchPartner: (match: Match) => User | undefined
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: mockUsers,
      toys: mockToys,
      swipes: mockSwipes,
      matches: mockMatches,
      swapProposals: mockSwapProposals,
      messages: mockMessages,

      login: (email, _password, name?, district?) => {
        const state = get()
        let user = state.users.find(u => u.email === email)
        if (!user) {
          user = {
            id: 'user-' + Date.now(),
            name: name || email.split('@')[0],
            email,
            district: district || 'District 2',
            trust_score: 3.0,
            swaps_completed: 0,
            is_onboarded: false,
            profile_photo_url: `https://picsum.photos/seed/${Date.now()}/200/200`,
            children_ages: [],
          }
          set(s => ({ users: [...s.users, user!] }))
        }
        set({ currentUser: user })
        return user
      },

      logout: () => set({ currentUser: null }),

      completeOnboarding: (ages) => {
        set(s => {
          if (!s.currentUser) return s
          const updated = { ...s.currentUser, is_onboarded: true, children_ages: ages }
          return {
            currentUser: updated,
            users: s.users.map(u => u.id === updated.id ? updated : u),
          }
        })
      },

      addToy: (toy) => {
        const user = get().currentUser
        if (!user) return
        const newToy: Toy = {
          ...toy,
          id: 'toy-' + Date.now(),
          user_id: user.id,
          is_available: true,
        }
        set(s => ({ toys: [...s.toys, newToy] }))
      },

      updateToy: (id, updates) => {
        set(s => ({ toys: s.toys.map(t => t.id === id ? { ...t, ...updates } : t) }))
      },

      deleteToy: (id) => {
        set(s => ({ toys: s.toys.filter(t => t.id !== id) }))
      },

      addSwipe: (toyId, toyOwnerId, direction) => {
        const state = get()
        const user = state.currentUser
        if (!user) return null
        const swipe: Swipe = {
          id: 'swipe-' + Date.now(),
          swiper_id: user.id,
          toy_id: toyId,
          toy_owner_id: toyOwnerId,
          direction,
        }
        set(s => ({ swipes: [...s.swipes, swipe] }))

        if (direction === 'right') {
          // Check if the other user swiped right on any of our toys
          const theirRightSwipes = state.swipes.filter(
            s => s.swiper_id === toyOwnerId && s.toy_owner_id === user.id && s.direction === 'right'
          )
          if (theirRightSwipes.length > 0) {
            const existingMatch = state.matches.find(
              m => (m.user_a_id === user.id && m.user_b_id === toyOwnerId) ||
                   (m.user_a_id === toyOwnerId && m.user_b_id === user.id)
            )
            if (!existingMatch) {
              const match: Match = {
                id: 'match-' + Date.now(),
                user_a_id: user.id,
                user_b_id: toyOwnerId,
                status: 'active',
                created_at: new Date().toISOString(),
              }
              set(s => ({ matches: [...s.matches, match] }))
              return match
            }
          }
        }
        return null
      },

      sendMessage: (matchId, content) => {
        const user = get().currentUser
        if (!user) return
        const msg: Message = {
          id: 'msg-' + Date.now(),
          match_id: matchId,
          sender_id: user.id,
          content,
          created_at: new Date().toISOString(),
        }
        set(s => ({ messages: [...s.messages, msg] }))
      },

      createProposal: (matchId, offeredToyId, requestedToyId) => {
        const user = get().currentUser
        if (!user) return
        const proposal: SwapProposal = {
          id: 'prop-' + Date.now(),
          match_id: matchId,
          proposer_id: user.id,
          offered_toy_id: offeredToyId,
          requested_toy_id: requestedToyId,
          status: 'pending',
          round_number: 1,
        }
        set(s => ({ swapProposals: [...s.swapProposals, proposal] }))
      },

      respondToProposal: (proposalId, status) => {
        set(s => ({
          swapProposals: s.swapProposals.map(p =>
            p.id === proposalId ? { ...p, status } : p
          ),
        }))
      },

      getUser: (id) => get().users.find(u => u.id === id),
      getToy: (id) => get().toys.find(t => t.id === id),
      getMatchMessages: (matchId) => get().messages.filter(m => m.match_id === matchId).sort((a, b) => a.created_at.localeCompare(b.created_at)),
      getMatchProposals: (matchId) => get().swapProposals.filter(p => p.match_id === matchId),
      getUserToys: (userId) => get().toys.filter(t => t.user_id === userId),
      getBrowseToys: () => {
        const state = get()
        const user = state.currentUser
        if (!user) return []
        const swipedToyIds = new Set(state.swipes.filter(s => s.swiper_id === user.id).map(s => s.toy_id))
        return state.toys.filter(t => t.user_id !== user.id && t.is_available && !swipedToyIds.has(t.id))
      },
      getUserMatches: () => {
        const state = get()
        const user = state.currentUser
        if (!user) return []
        return state.matches.filter(m => m.user_a_id === user.id || m.user_b_id === user.id)
      },
      getMatchPartner: (match) => {
        const state = get()
        const user = state.currentUser
        if (!user) return undefined
        const partnerId = match.user_a_id === user.id ? match.user_b_id : match.user_a_id
        return state.users.find(u => u.id === partnerId)
      },
    }),
    { name: 'toyswap-storage' }
  )
)
