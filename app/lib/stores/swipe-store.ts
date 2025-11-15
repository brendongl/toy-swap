/**
 * Swipe Store - Zustand store for swipe state
 */

import { create } from 'zustand';
import type { Toy } from '@/types';

interface SwipeState {
  toys: Toy[];
  currentIndex: number;
  dailySwipeCount: number;
  setToys: (toys: Toy[]) => void;
  nextToy: () => void;
  incrementSwipeCount: () => void;
  resetDailySwipeCount: () => void;
}

const MAX_DAILY_SWIPES = parseInt(process.env.NEXT_PUBLIC_MAX_DAILY_SWIPES || '50', 10);

export const useSwipeStore = create<SwipeState>((set) => ({
  toys: [],
  currentIndex: 0,
  dailySwipeCount: 0,
  setToys: (toys) => set({ toys, currentIndex: 0 }),
  nextToy: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
  incrementSwipeCount: () =>
    set((state) => ({
      dailySwipeCount: Math.min(state.dailySwipeCount + 1, MAX_DAILY_SWIPES),
    })),
  resetDailySwipeCount: () => set({ dailySwipeCount: 0 }),
}));
