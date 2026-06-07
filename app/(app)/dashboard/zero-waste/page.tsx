import { ZeroWasteDashboardGrid } from "@/components/zero-waste-dashboard-grid";
import { filterByBucket } from "@/lib/buckets";
import { getProducts } from "@/lib/products";

export default async function ZeroWastePage() {
  const products = filterByBucket(await getProducts(), "zero_waste");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Zero waste</h1>
        <p className="page-desc">
          Sản phẩm còn 1–4 ngày ({products.length} mặt hàng). Gạt sang phải
          khi đã dán nhãn (vừa chuyển từ off 30%).
        </p>
      </div>
      <ZeroWasteDashboardGrid
        products={products}
        emptyMessage="Không có sản phẩm cần dán zero waste."
      />
    </div>
  );
}
