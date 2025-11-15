/**
 * useMatches Hook - Fetch and manage matches
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Match } from '@/types';

export function useMatches(userId?: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  // Fetch user's matches
  const { data: matches, isLoading: isMatchesLoading } = useQuery({
    queryKey: ['matches', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          user_a:users!matches_user_a_id_fkey(*),
          user_b:users!matches_user_b_id_fkey(*)
        `)
        .or(`user_a_id.eq.${userId},user_b_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // For each match, fetch the toys that were swiped
      const matchesWithToys = await Promise.all(
        data.map(async (match) => {
          const otherUserId = match.user_a_id === userId ? match.user_b_id : match.user_a_id;

          // Get toys I liked from them
          const { data: toysILiked } = await supabase
            .from('swipes')
            .select('toy_id, toys(*)')
            .eq('swiper_id', userId)
            .eq('toy_owner_id', otherUserId)
            .eq('direction', 'right');

          // Get toys they liked from me
          const { data: toysTheyLiked } = await supabase
            .from('swipes')
            .select('toy_id, toys(*)')
            .eq('swiper_id', otherUserId)
            .eq('toy_owner_id', userId)
            .eq('direction', 'right');

          return {
            ...match,
            toys_i_liked: toysILiked?.map((s: any) => s.toys) || [],
            toys_they_liked: toysTheyLiked?.map((s: any) => s.toys) || [],
            other_user: match.user_a_id === userId ? match.user_b : match.user_a,
          };
        })
      );

      return matchesWithToys as Match[];
    },
    enabled: !!userId,
  });

  // Update match status
  const updateMatchStatus = useMutation({
    mutationFn: async ({ matchId, status }: { matchId: string; status: string }) => {
      const { data, error } = await supabase
        .from('matches')
        .update({ status })
        .eq('id', matchId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches', userId] });
    },
  });

  return {
    matches,
    isMatchesLoading,
    updateMatchStatus,
  };
}
