import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Review type definition
export interface Review {
  id?: string;
  name: string;
  email?: string;
  role?: string;
  location?: string;
  rating: number;
  review_text: string;
  savings?: string;
  destination?: string;
  verified?: boolean;
  created_at?: string;
}

