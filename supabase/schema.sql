-- ─── RDKit Supabase Schema ───────────────────────────────────────────────────
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── Leads ──────────────────────────────────────────────────────────────────
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text not null,
  phone       text,
  source      text default 'website',
  context     jsonb default '{}',
  created_at  timestamptz default now()
);

create index if not exists leads_email_idx on leads(email);
create index if not exists leads_created_at_idx on leads(created_at desc);

-- ─── Diagnostics ─────────────────────────────────────────────────────────────
create table if not exists diagnostics (
  id                   uuid primary key default gen_random_uuid(),
  lead_id              uuid references leads(id) on delete set null,
  input                jsonb not null,
  deterministic        jsonb,
  ai_result            jsonb,
  mode                 text,
  confidence           text check (confidence in ('early','moderate','strong')),
  estimated_offset_min integer,
  estimated_offset_max integer,
  created_at           timestamptz default now()
);

create index if not exists diagnostics_lead_idx on diagnostics(lead_id);
create index if not exists diagnostics_created_at_idx on diagnostics(created_at desc);

-- ─── Eligibility Checks ───────────────────────────────────────────────────────
create table if not exists eligibility_checks (
  id               uuid primary key default gen_random_uuid(),
  lead_id          uuid references leads(id) on delete set null,
  answers          jsonb not null,
  eligible         boolean,
  estimated_offset integer,
  created_at       timestamptz default now()
);

create index if not exists eligibility_lead_idx on eligibility_checks(lead_id);

-- ─── Deposits ─────────────────────────────────────────────────────────────────
create table if not exists deposits (
  id                uuid primary key default gen_random_uuid(),
  lead_id           uuid references leads(id) on delete set null,
  stripe_session_id text,
  amount            integer default 500,
  status            text default 'pending' check (status in ('pending','paid','failed','refunded')),
  created_at        timestamptz default now()
);

create index if not exists deposits_lead_idx on deposits(lead_id);
create index if not exists deposits_stripe_idx on deposits(stripe_session_id);

-- ─── Row Level Security (read-only for anon, full for service role) ───────────
alter table leads             enable row level security;
alter table diagnostics       enable row level security;
alter table eligibility_checks enable row level security;
alter table deposits          enable row level security;

-- Allow anon to INSERT only (forms submit data)
create policy "anon insert leads"              on leads             for insert to anon with check (true);
create policy "anon insert diagnostics"        on diagnostics       for insert to anon with check (true);
create policy "anon insert eligibility_checks" on eligibility_checks for insert to anon with check (true);
create policy "anon insert deposits"           on deposits          for insert to anon with check (true);

-- SELECT is blocked for anon (you view data in Supabase dashboard only)
