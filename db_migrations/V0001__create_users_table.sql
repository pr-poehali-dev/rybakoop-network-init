CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  avatar_url TEXT,
  cover_url TEXT,
  city_id INTEGER,
  bio TEXT,
  experience_years INTEGER DEFAULT 0,
  total_catches INTEGER DEFAULT 0,
  rating INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);