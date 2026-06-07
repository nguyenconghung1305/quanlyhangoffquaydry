-- Gộp migration 002 + 003 (chạy nếu chưa chạy từng file riêng)
alter table public.products
add column if not exists off_30_labeled boolean not null default false;

alter table public.products
add column if not exists zero_waste_labeled boolean not null default false;

alter table public.products
add column if not exists expired_collected boolean not null default false;
