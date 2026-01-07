export interface User {
  id: number;
  email: string;
  username: string;
  avatar_url?: string;
  cover_url?: string;
  city_id?: number;
  bio?: string;
  experience_years: number;
  total_catches: number;
  rating: number;
  created_at: string;
}

export interface City {
  id: number;
  name: string;
  region: string;
  latitude?: number;
  longitude?: number;
  population?: number;
}

export interface Post {
  id: number;
  user_id: number;
  city_id: number;
  content: string;
  images?: string[];
  tags?: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Message {
  id: number;
  city_id: number;
  user_id: number;
  content: string;
  message_type: 'text' | 'voice' | 'sticker';
  reply_to?: number;
  is_edited: boolean;
  created_at: string;
  user?: User;
}

export interface Catch {
  id: number;
  user_id: number;
  fish_type: string;
  weight?: number;
  latitude: number;
  longitude: number;
  gear?: string;
  weather?: string;
  time_of_day?: string;
  images?: string[];
  description?: string;
  created_at: string;
  user?: User;
}

export interface Achievement {
  id: number;
  name: string;
  description?: string;
  icon: string;
  condition_type: string;
  condition_value: number;
}

export type Screen = 'auth' | 'feed' | 'chat' | 'city' | 'profile' | 'map' | 'leaderboard' | 'search';
