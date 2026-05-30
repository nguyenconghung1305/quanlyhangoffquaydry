import { DashboardGrid } from "@/components/dashboard-grid";
import { filterByBucket } from "@/lib/buckets";
import { getProducts } from "@/lib/products";

export default async function ZeroWastePage() {
  const products = filterByBucket(await getProducts(), "zero_waste");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Zero waste</h1>
        <p className="page-desc">
          Sản phẩm còn 1–4 ngày — dán nhãn zero waste ({products.length} mặt
          hàng)
        </p>
      </div>
      <DashboardGrid
        products={products}
        emptyMessage="Không có sản phẩm cần dán zero waste."
      />
    </div>
  );
}
