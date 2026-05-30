import Link from "next/link";
import { HomeDashboardLinks } from "@/components/home-dashboard-links";
import { ProductFormDialog } from "@/components/product-form-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProductBucket } from "@/lib/buckets";
import { getProducts } from "@/lib/products";
import type { ProductBucket } from "@/lib/buckets";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const products = await getProducts();

  const counts: Record<ProductBucket, number> = {
    normal: 0,
    off_15: 0,
    off_30: 0,
    zero_waste: 0,
    expired: 0,
  };

  for (const product of products) {
    const bucket = getProductBucket(product.expiry_date);
    counts[bucket]++;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">Trang chủ</h1>
          <p className="page-desc">
            Tổng {products.length} sản phẩm trong kho — tự động phân loại theo
            hạn sử dụng (múi giờ Việt Nam).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ProductFormDialog />
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "inline-flex items-center gap-1.5"
            )}
          >
            Danh sách sản phẩm
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <section>
        <h2 className="mb-5 text-2xl font-bold">Dashboard hàng off</h2>
        <HomeDashboardLinks counts={counts} />
      </section>

      {counts.normal > 0 && (
        <p className="text-base text-muted-foreground">
          {counts.normal} sản phẩm còn trên 45 ngày — chỉ hiển thị trong trang
          quản lý.
        </p>
      )}
    </div>
  );
}
