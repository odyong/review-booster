
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
-- Stores business-specific configuration
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  business_name text not null,
  google_review_url text not null,
  paddle_sub_status text default 'inactive',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FEEDBACK_REQUESTS TABLE
-- Stores unique links generated for customers
create table if not exists feedback_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  customer_name text not null,
  status text check (status in ('pending', 'clicked', 'rated')) default 'pending',
  rating integer check (rating >= 1 and rating <= 5),
  feedback_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES
alter table profiles enable row level security;
alter table feedback_requests enable row level security;

-- Profiles: Users can only read/write their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Feedback Requests: 
-- 1. Owners can see all their requests
-- 2. Public can view and update a specific request for rating (via ID)
create policy "Owners can view own requests" on feedback_requests for select using (auth.uid() = user_id);
create policy "Owners can create requests" on feedback_requests for insert with check (auth.uid() = user_id);
create policy "Public can view individual request" on feedback_requests for select using (true);
create policy "Public can update rating on request" on feedback_requests for update using (true);
