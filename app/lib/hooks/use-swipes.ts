/**
 * useSwipes Hook - Manage swipe operations
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { SwipeDirection } from '@/types';

export function useSwipes(userId?: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  // Record a swipe
  const recordSwipe = useMutation({
    mutationFn: async ({
      toyId,
      toyOwnerId,
      direction,
    }: {
      toyId: string;
      toyOwnerId: string;
      direction: SwipeDirection;
    }) => {
      if (!userId) throw new Error('User not authenticated');

      // Insert swipe record
      const { data: swipe, error: swipeError } = await supabase
        .from('swipes')
        .insert({
          swiper_id: userId,
          toy_id: toyId,
          toy_owner_id: toyOwnerId,
          direction,
        })
        .select()
        .single();

      if (swipeError) throw swipeError;

      // If swipe right, check for mutual match
      if (direction === 'right') {
        // Check if the other user has also swiped right on any of my toys
        const { data: mutualSwipes, error: matchError } = await supabase
          .from('swipes')
          .select('*')
          .eq('swiper_id', toyOwnerId)
          .eq('toy_owner_id', userId)
          .eq('direction', 'right');

        if (matchError) throw matchError;

        // If mutual swipe exists, check if match already created
        if (mutualSwipes && mutualSwipes.length > 0) {
          const userIds = [userId, toyOwnerId].sort();

          // Check if match already exists
          const { data: existingMatch } = await supabase
            .from('matches')
            .select('*')
            .eq('user_a_id', userIds[0])
            .eq('user_b_id', userIds[1])
            .single();

          // Create match if it doesn't exist
          if (!existingMatch) {
            const { data: newMatch, error: createMatchError } = await supabase
              .from('matches')
              .insert({
                user_a_id: userIds[0],
                user_b_id: userIds[1],
                status: 'active',
              })
              .select()
              .single();

            if (createMatchError) throw createMatchError;

            return { swipe, match: newMatch };
          }
        }
      }

      // Update toy swipe count
      await supabase.rpc('increment_swipe_count', { toy_id: toyId });

      return { swipe, match: null };
    },
    onSuccess: (data) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['toys', 'browse', userId] });

      if (data.match) {
        queryClient.invalidateQueries({ queryKey: ['matches', userId] });
      }
    },
  });

  return {
    recordSwipe,
  };
}
