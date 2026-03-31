CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('broker','driver','admin')),
  full_name TEXT,
  company_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  mc_number TEXT,
  dot_number TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE loads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  pickup_location TEXT,
  delivery_location TEXT,
  load_type TEXT,
  price NUMERIC,
  status TEXT DEFAULT 'posted',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_id UUID REFERENCES loads(id),
  broker_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  final_text TEXT,
  broker_signature TEXT,
  driver_signature TEXT,
  locked BOOLEAN DEFAULT false,
  signed_pdf_url TEXT,
  signed_at TIMESTAMP,
  audit JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
