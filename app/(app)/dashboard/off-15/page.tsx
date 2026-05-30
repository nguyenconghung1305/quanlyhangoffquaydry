import { DashboardGrid } from "@/components/dashboard-grid";
import { filterByBucket } from "@/lib/buckets";
import { getProducts } from "@/lib/products";

export default async function Off15Page() {
  const products = filterByBucket(await getProducts(), "off_15");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Hàng off 15%</h1>
        <p className="page-desc">
          Sản phẩm còn 31–45 ngày đến hạn sử dụng ({products.length} mặt hàng)
        </p>
      </div>
      <DashboardGrid
        products={products}
        emptyMessage="Không có sản phẩm trong nhóm off 15%."
      />
    </div>
  );
}
