-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extended from auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  roles TEXT[] NOT NULL DEFAULT ARRAY['client'],
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Driver profiles
CREATE TABLE IF NOT EXISTS driver_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  license_number VARCHAR(100),
  license_expiry DATE,
  vehicle_brand VARCHAR(100),
  vehicle_model VARCHAR(100),
  vehicle_year INTEGER,
  vehicle_plate VARCHAR(20) UNIQUE,
  insurance_company VARCHAR(100),
  insurance_expiry DATE,
  rating DECIMAL(3,2) DEFAULT 0,
  total_missions INTEGER DEFAULT 0,
  completed_missions INTEGER DEFAULT 0,
  document_status VARCHAR(50) DEFAULT 'pending', -- pending, validated, rejected
  blocked BOOLEAN DEFAULT FALSE,
  blocked_reason TEXT,
  bank_account_holder VARCHAR(255),
  bank_iban VARCHAR(34),
  total_earnings DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Client profiles
CREATE TABLE IF NOT EXISTS client_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  total_convoyages INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Convoyages
CREATE TABLE IF NOT EXISTS convoyages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_brand VARCHAR(100),
  vehicle_model VARCHAR(100),
  vehicle_type VARCHAR(50),
  vehicle_plate VARCHAR(20),
  vehicle_color VARCHAR(50),
  vehicle_year INTEGER,
  pickup_address TEXT NOT NULL,
  pickup_city VARCHAR(100),
  pickup_postal_code VARCHAR(20),
  pickup_lat DECIMAL(10,8),
  pickup_lon DECIMAL(10,8),
  delivery_address TEXT NOT NULL,
  delivery_city VARCHAR(100),
  delivery_postal_code VARCHAR(20),
  delivery_lat DECIMAL(10,8),
  delivery_lon DECIMAL(10,8),
  preferred_date DATE,
  flexible_dates BOOLEAN DEFAULT FALSE,
  estimated_distance INTEGER,
  estimated_duration VARCHAR(100),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'open', -- open, assigned, in_progress, completed, cancelled
  driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offers
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  convoyage_id UUID NOT NULL REFERENCES convoyages(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  proposed_price DECIMAL(10,2) NOT NULL,
  estimated_duration VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(convoyage_id, driver_id)
);

-- Documents
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL, -- license, insurance, identity, residential_proof
  file_url TEXT NOT NULL,
  file_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  validation_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Missions (execution of convoyages)
CREATE TABLE IF NOT EXISTS missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  convoyage_id UUID NOT NULL REFERENCES convoyages(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'assigned', -- assigned, started, completed, cancelled
  pickup_timestamp TIMESTAMP WITH TIME ZONE,
  delivery_timestamp TIMESTAMP WITH TIME ZONE,
  pickup_odometer INTEGER,
  delivery_odometer INTEGER,
  actual_distance INTEGER,
  observations TEXT,
  signature_url TEXT,
  photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  convoyage_id UUID NOT NULL REFERENCES convoyages(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  driver_payout DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, refunded
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews & Ratings
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(mission_id, author_id)
);

-- Disputes
CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  convoyage_id UUID NOT NULL REFERENCES convoyages(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, resolved, rejected
  description TEXT NOT NULL,
  resolution TEXT,
  refund_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracking locations (real-time mission tracking)
CREATE TABLE IF NOT EXISTS tracking_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(10,8) NOT NULL,
  accuracy DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_driver_profiles_user_id ON driver_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_client_profiles_user_id ON client_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_convoyages_client_id ON convoyages(client_id);
CREATE INDEX IF NOT EXISTS idx_convoyages_driver_id ON convoyages(driver_id);
CREATE INDEX IF NOT EXISTS idx_convoyages_status ON convoyages(status);
CREATE INDEX IF NOT EXISTS idx_offers_convoyage_id ON offers(convoyage_id);
CREATE INDEX IF NOT EXISTS idx_offers_driver_id ON offers(driver_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_missions_convoyage_id ON missions(convoyage_id);
CREATE INDEX IF NOT EXISTS idx_missions_driver_id ON missions(driver_id);
CREATE INDEX IF NOT EXISTS idx_missions_status ON missions(status);
CREATE INDEX IF NOT EXISTS idx_payments_mission_id ON payments(mission_id);
CREATE INDEX IF NOT EXISTS idx_reviews_mission_id ON reviews(mission_id);
CREATE INDEX IF NOT EXISTS idx_disputes_mission_id ON disputes(mission_id);
CREATE INDEX IF NOT EXISTS idx_tracking_locations_mission_id ON tracking_locations(mission_id);
