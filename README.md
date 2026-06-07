# Quản lý hàng off theo date

Website quản lý hàng off trên kệ: thêm/sửa/xóa sản phẩm và tự động phân loại theo hạn sử dụng (múi giờ `Asia/Ho_Chi_Minh`).

| Còn hạn | Dashboard |
|---------|-----------|
| 31–45 ngày | Hàng off 15% |
| 5–30 ngày | Hàng off 30% |
| 1–4 ngày | Zero waste |
| Đã hết hạn | Tab riêng |
| Trên 45 ngày | Chỉ trong trang Quản lý |

## Tech stack

- Next.js + TypeScript + Tailwind + shadcn/ui
- Supabase (PostgreSQL + Auth)
- Deploy: Vercel (miễn phí)

## Cài đặt local

### 1. Supabase

1. Tạo project tại [supabase.com](https://supabase.com).
2. Vào **SQL Editor** → chạy lần lượt:
   - [`supabase/migrations/001_products.sql`](supabase/migrations/001_products.sql)
   - [`supabase/migrations/002_off_30_labeled.sql`](supabase/migrations/002_off_30_labeled.sql)
   - [`supabase/migrations/003_zero_waste_expired_labels.sql`](supabase/migrations/003_zero_waste_expired_labels.sql)
3. Vào **Project Settings → API** → copy `Project URL` và `anon public` key.

### 2. Biến môi trường

```bash
cp .env.example .env.local
```

Điền `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` vào `.env.local`.

### 3. Chạy dev

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Tạo tài khoản (~10 người)

**Cách 1 — Supabase Dashboard (khuyến nghị):**

1. **Authentication → Users → Add user** → nhập email + mật khẩu.
2. Lặp lại cho từng nhân viên.

**Cách 2 — Tắt đăng ký công khai:**

1. **Authentication → Providers → Email** → tắt **Enable sign ups** nếu có.
2. Chỉ admin tạo user như trên.

Mọi user đã đăng nhập dùng **chung một kho** sản phẩm (Row Level Security: authenticated read/write).

## Deploy lên Vercel (miễn phí)

1. Đẩy code lên GitHub.
2. [vercel.com](https://vercel.com) → **Import** repository.
3. Thêm Environment Variables (giống `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**.

Trong Supabase: **Authentication → URL Configuration** → thêm **Site URL** và **Redirect URLs** của domain Vercel (ví dụ `https://your-app.vercel.app`).

## Cấu trúc thư mục chính

```
app/
  (app)/              # Trang sau đăng nhập
  login/              # Đăng nhập
  actions/            # Server actions CRUD + auth
lib/
  buckets.ts          # Logic phân loại theo ngày
  supabase/           # Supabase clients
supabase/migrations/  # SQL schema + RLS
```

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy development |
| `npm run build` | Build production |
| `npm run start` | Chạy production local |
