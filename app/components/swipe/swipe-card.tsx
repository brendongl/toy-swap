/**
 * SwipeCard Component - Tinder-style swipeable card
 */

'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import type { Toy } from '@/types';
import { getAgeRangeLabel, getConditionColor, formatTrustScore } from '@/lib/utils';

interface SwipeCardProps {
  toy: Toy;
  onSwipe: (direction: 'left' | 'right') => void;
  onCardClick?: () => void;
}

export function SwipeCard({ toy, onSwipe, onCardClick }: SwipeCardProps) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 100;

    if (info.offset.x > swipeThreshold) {
      // Swipe right
      setExitX(500);
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left
      setExitX(-500);
      onSwipe('left');
    }
  };

  const currentPhoto = toy.photos && toy.photos.length > 0 ? toy.photos[0] : null;

  return (
    <motion.div
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        opacity,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div
        className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={onCardClick}
      >
        {/* Toy Image */}
        <div className="relative h-2/3 bg-gray-100">
          {currentPhoto ? (
            <img
              src={currentPhoto}
              alt={toy.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Swipe Indicators */}
          <motion.div
            className="absolute top-8 left-8 px-4 py-2 border-4 border-green-500 text-green-500 text-2xl font-bold rounded-lg rotate-[-20deg]"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            LIKE
          </motion.div>

          <motion.div
            className="absolute top-8 right-8 px-4 py-2 border-4 border-red-500 text-red-500 text-2xl font-bold rounded-lg rotate-[20deg]"
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
          >
            NOPE
          </motion.div>

          {/* Photo Count */}
          {toy.photos && toy.photos.length > 1 && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-sm">
              1/{toy.photos.length}
            </div>
          )}
        </div>

        {/* Toy Info */}
        <div className="p-6 h-1/3 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{toy.title}</h2>

          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(toy.condition)}`}>
              {toy.condition}
            </span>
            <span className="text-gray-600 text-sm">
              {getAgeRangeLabel(toy.age_range)}
            </span>
          </div>

          {toy.description && (
            <p className="text-gray-700 mb-3 line-clamp-2">
              {toy.description}
            </p>
          )}

          {/* Owner Info */}
          {toy.user && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {toy.user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{toy.user.name}</div>
                  <div className="text-sm text-gray-600">{toy.user.district}</div>
                </div>
              </div>

              <div className="flex items-center text-yellow-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{formatTrustScore(toy.user.trust_score)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
