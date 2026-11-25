-- Didier Imports — Schema opcional para sincronizacao multi-dispositivo no Supabase
-- Basta colar no SQL Editor do Supabase e configurar NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel.

create table if not exists public.orders (
  order_id text primary key,
  status text not null default 'novo',
  total numeric(10, 2) not null default 0,
  estimated_cost numeric(10, 2) not null default 0,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.custom_models (
  id text primary key,
  team_id text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.store_settings (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.custom_models enable row level security;
alter table public.store_settings enable row level security;

create policy "Allow public insert orders" on public.orders for insert with check (true);
create policy "Allow anon read/update orders" on public.orders for all using (true);
create policy "Allow read/write custom_models" on public.custom_models for all using (true);
create policy "Allow read/write store_settings" on public.store_settings for all using (true);
