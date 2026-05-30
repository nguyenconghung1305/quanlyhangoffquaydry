-- Đánh dấu đã dán lại nhãn 30% (chỉ hiển thị trên dashboard Off 30%)
alter table public.products
add column if not exists off_30_labeled boolean not null default false;
