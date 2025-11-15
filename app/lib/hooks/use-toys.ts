/**
 * useToys Hook - Fetch and manage toys
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Toy, AgeRange, ToyCondition } from '@/types';

export function useToys(userId?: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  // Fetch toys for browsing
  const { data: browseToys, isLoading: isBrowseLoading } = useQuery({
    queryKey: ['toys', 'browse', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('toys')
        .select('*, user:users(*)')
        .eq('is_available', true)
        .is('deleted_at', null)
        .neq('user_id', userId || '')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as Toy[];
    },
    enabled: !!userId,
  });

  // Fetch user's own toys
  const { data: myToys, isLoading: isMyToysLoading } = useQuery({
    queryKey: ['toys', 'my', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('toys')
        .select('*')
        .eq('user_id', userId!)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Toy[];
    },
    enabled: !!userId,
  });

  // Create toy mutation
  const createToy = useMutation({
    mutationFn: async (toy: {
      title: string;
      description?: string;
      age_range: AgeRange;
      condition: ToyCondition;
      brand?: string;
      original_price?: string;
      photos: string[];
      is_available: boolean;
    }) => {
      if (!userId) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('toys')
        .insert({
          ...toy,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Toy;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toys', 'my', userId] });
    },
  });

  // Update toy mutation
  const updateToy = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Toy> & { id: string }) => {
      const { data, error } = await supabase
        .from('toys')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId!)
        .select()
        .single();

      if (error) throw error;
      return data as Toy;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toys', 'my', userId] });
    },
  });

  // Delete toy mutation (soft delete)
  const deleteToy = useMutation({
    mutationFn: async (toyId: string) => {
      const { error } = await supabase
        .from('toys')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', toyId)
        .eq('user_id', userId!);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toys', 'my', userId] });
    },
  });

  return {
    browseToys,
    myToys,
    isBrowseLoading,
    isMyToysLoading,
    createToy,
    updateToy,
    deleteToy,
  };
}
