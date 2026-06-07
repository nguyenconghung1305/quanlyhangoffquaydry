import { ExpiredDashboardGrid } from "@/components/expired-dashboard-grid";
import { filterByBucket } from "@/lib/buckets";
import { getProducts } from "@/lib/products";

export default async function ExpiredPage() {
  const products = filterByBucket(await getProducts(), "expired");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Đã hết hạn</h1>
        <p className="page-desc">
          Sản phẩm đã quá hạn ({products.length} mặt hàng). Gạt khi đã gom xử
          lý xong.
        </p>
      </div>
      <ExpiredDashboardGrid
        products={products}
        emptyMessage="Không có sản phẩm hết hạn."
      />
    </div>
  );
}
