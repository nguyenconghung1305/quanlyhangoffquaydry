import { Off30DashboardGrid } from "@/components/off-30-dashboard-grid";
import { filterByBucket } from "@/lib/buckets";
import { getProducts } from "@/lib/products";

export default async function Off30Page() {
  const products = filterByBucket(await getProducts(), "off_30");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Hàng off 30%</h1>
        <p className="page-desc">
          Sản phẩm còn 5–30 ngày ({products.length} mặt hàng). Gạt sang phải
          khi đã dán lại nhãn 30% (vừa chuyển từ off 15%).
        </p>
      </div>
      <Off30DashboardGrid
        products={products}
        emptyMessage="Không có sản phẩm trong nhóm off 30%."
      />
    </div>
  );
}
