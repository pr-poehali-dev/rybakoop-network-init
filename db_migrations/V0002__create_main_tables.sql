CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  region VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  population INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  city_id INTEGER,
  content TEXT NOT NULL,
  images TEXT[],
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  city_id INTEGER,
  user_id INTEGER,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text',
  reply_to INTEGER,
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE catches (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  fish_type VARCHAR(100) NOT NULL,
  weight DECIMAL(6, 2),
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  gear VARCHAR(255),
  weather VARCHAR(50),
  time_of_day VARCHAR(20),
  images TEXT[],
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon TEXT,
  condition_type VARCHAR(50) NOT NULL,
  condition_value INTEGER NOT NULL
);

CREATE INDEX idx_posts_city ON posts(city_id);
CREATE INDEX idx_messages_city ON messages(city_id);
CREATE INDEX idx_catches_location ON catches(latitude, longitude);