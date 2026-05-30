-- Chạy trong Supabase SQL Editor hoặc qua Supabase CLI

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text unique not null,
  price numeric(12, 2) not null check (price >= 0),
  quantity integer not null check (quantity >= 0),
  expiry_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);

create index if not exists products_expiry_date_idx on public.products (expiry_date);

alter table public.products enable row level security;

create policy "Authenticated users can read products"
  on public.products
  for select
  to authenticated
  using (true);

create policy "Authenticated users can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

create or replace function public.handle_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;

create trigger products_updated_at
  before update on public.products
  for each row
  execute function public.handle_products_updated_at();
