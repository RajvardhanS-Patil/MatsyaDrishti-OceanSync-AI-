-- Create alerts table
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'moderate', 'low')),
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access" ON public.alerts
    FOR SELECT TO anon USING (true);

-- Create marine_health table
CREATE TABLE IF NOT EXISTS public.marine_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    health_score NUMERIC(5,2) NOT NULL,
    coral_health NUMERIC(5,2) NOT NULL,
    biodiversity_score NUMERIC(5,2) NOT NULL,
    water_quality NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.marine_health ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access" ON public.marine_health
    FOR SELECT TO anon USING (true);

-- Insert initial seed data for alerts
INSERT INTO public.alerts (title, severity, description, created_at) VALUES
('Cyclonic Formation NE Sector', 'critical', '15.8°N, 74.2°E', now() - interval '2 minutes'),
('Coral Bleaching Alert — Sector 7-G', 'high', '15.1°N, 73.6°E', now() - interval '18 minutes'),
('Unregistered Vessel — Zone Echo', 'moderate', '15.3°N, 73.9°E', now() - interval '34 minutes'),
('Sardine Population Drop — Sector 4', 'high', '14.9°N, 74.0°E', now() - interval '1 hour'),
('Elevated SST — Shallow Reef Band', 'low', '15.5°N, 73.7°E', now() - interval '2 hours');

-- Insert initial seed data for marine_health
INSERT INTO public.marine_health (health_score, coral_health, biodiversity_score, water_quality) VALUES
(84.2, 61.5, 78.3, 91.2);
