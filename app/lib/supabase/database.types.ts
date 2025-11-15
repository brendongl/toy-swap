/**
 * Supabase Database Types
 * This will be auto-generated once we set up Supabase
 * For now, using a placeholder
 */

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          phone_number: string | null;
          email: string | null;
          password_hash: string | null;
          name: string;
          profile_photo_url: string | null;
          district: string;
          location: unknown | null;
          bio: string | null;
          trust_score: number;
          completed_swaps_count: number;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          phone_number?: string | null;
          email?: string | null;
          password_hash?: string | null;
          name: string;
          profile_photo_url?: string | null;
          district: string;
          location?: unknown | null;
          bio?: string | null;
          trust_score?: number;
          completed_swaps_count?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          phone_number?: string | null;
          email?: string | null;
          password_hash?: string | null;
          name?: string;
          profile_photo_url?: string | null;
          district?: string;
          location?: unknown | null;
          bio?: string | null;
          trust_score?: number;
          completed_swaps_count?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      // Add other tables as needed
    };
  };
};
