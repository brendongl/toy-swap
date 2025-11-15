/**
 * Dashboard Home - Browse/Swipe Screen
 */

'use client';

import { useState } from 'react';
import { useAuth, useToys, useSwipes, useMatches } from '@/lib/hooks';
import { Button } from '@/components/ui';
import { SwipeCard } from '@/components/swipe';
import Link from 'next/link';
import { useSwipeStore } from '@/lib/stores';

export default function DashboardPage() {
  const { user } = useAuth();
  const { browseToys, isBrowseLoading } = useToys(user?.id);
  const { recordSwipe } = useSwipes(user?.id);
  const { matches } = useMatches(user?.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const { dailySwipeCount, incrementSwipeCount } = useSwipeStore();

  const MAX_DAILY_SWIPES = 50;
  const swipesRemaining = MAX_DAILY_SWIPES - dailySwipeCount;

  const handleSwipe = async (direction: 'left' | 'right') => {
    const currentToy = browseToys?.[currentIndex];
    if (!currentToy || !user) return;

    try {
      if (direction === 'right') {
        incrementSwipeCount();
      }

      // Record swipe in database
      const result = await recordSwipe.mutateAsync({
        toyId: currentToy.id,
        toyOwnerId: currentToy.user_id,
        direction,
      });

      // Show match modal if new match created
      if (result.match) {
        setShowMatchModal(true);
        setTimeout(() => setShowMatchModal(false), 3000);
      }
    } catch (error) {
      console.error('Error recording swipe:', error);
    }

    // Move to next toy
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  const currentToy = browseToys?.[currentIndex];
  const hasMoreToys = browseToys && currentIndex < browseToys.length;

  if (isBrowseLoading) {
    return (
      <div className="p-4 flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading toys...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <div className="text-xl font-bold text-blue-600">{swipesRemaining}</div>
          <div className="text-xs text-gray-600">Left Today</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <div className="text-xl font-bold text-green-600">{matches?.length || 0}</div>
          <div className="text-xs text-gray-600">Matches</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <div className="text-xl font-bold text-purple-600">{user?.completed_swaps_count || 0}</div>
          <div className="text-xs text-gray-600">Swaps</div>
        </div>
      </div>

      {/* Swipe Area */}
      {hasMoreToys && currentToy ? (
        <div>
          {/* Card Stack */}
          <div className="relative h-[500px] mb-6">
            {/* Background card (next toy) */}
            {browseToys[currentIndex + 1] && (
              <div className="absolute w-full h-full">
                <div className="w-full h-full bg-white rounded-2xl shadow-lg opacity-50 scale-95 transform"></div>
              </div>
            )}

            {/* Current card */}
            <SwipeCard
              key={currentToy.id}
              toy={currentToy}
              onSwipe={handleSwipe}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
            >
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={() => handleSwipe('right')}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95"
            >
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
            >
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Helper Text */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Swipe right to like, left to pass
          </p>
        </div>
      ) : (
        // Empty or No More Toys State
        <div className="text-center py-12">
          <div className="text-6xl mb-4">
            {swipesRemaining === 0 ? '⏰' : '🎉'}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {swipesRemaining === 0 ? 'Out of swipes for today!' : 'No more toys to browse'}
          </h3>
          <p className="text-gray-600 mb-6">
            {swipesRemaining === 0
              ? 'Come back tomorrow for 50 more swipes'
              : 'Check back later for new toys from other parents'}
          </p>

          <div className="space-y-3 max-w-sm mx-auto">
            <Link href="/dashboard/toys/new">
              <Button className="w-full">Add Your Toys</Button>
            </Link>
            <Link href="/dashboard/matches">
              <Button variant="outline" className="w-full">View Matches</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Match Modal */}
      {showMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">It's a Match!</h2>
            <p className="text-gray-600 mb-6">
              You both liked each other's toys! Check your matches to start swapping.
            </p>
            <Link href="/dashboard/matches">
              <Button className="w-full">View Matches</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
