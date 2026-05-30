import { DashboardGrid } from "@/components/dashboard-grid";
import { filterByBucket } from "@/lib/buckets";
import { getProducts } from "@/lib/products";

export default async function ExpiredPage() {
  const products = filterByBucket(await getProducts(), "expired");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Đã hết hạn</h1>
        <p className="page-desc">
          Sản phẩm đã quá hạn sử dụng — cần xử lý ngay ({products.length} mặt
          hàng)
        </p>
      </div>
      <DashboardGrid
        products={products}
        emptyMessage="Không có sản phẩm hết hạn."
      />
    </div>
  );
}
