-- Đánh dấu đã dán zero waste / đã gom hàng hết hạn
alter table public.products
add column if not exists zero_waste_labeled boolean not null default false;

alter table public.products
add column if not exists expired_collected boolean not null default false;
