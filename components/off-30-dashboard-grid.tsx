import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

type Off30DashboardGridProps = {
  products: Product[];
  emptyMessage: string;
};

export function Off30DashboardGrid({
  products,
  emptyMessage,
}: Off30DashboardGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed bg-white/60 p-10 text-center text-lg text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  const sorted = [...products].sort((a, b) => {
    if (a.off_30_labeled === b.off_30_labeled) {
      return a.expiry_date.localeCompare(b.expiry_date);
    }
    return a.off_30_labeled ? 1 : -1;
  });

  const pendingCount = products.filter((p) => !p.off_30_labeled).length;

  return (
    <div className="space-y-5">
      {pendingCount > 0 && (
        <p className="rounded-xl border-2 border-orange-300 bg-orange-50 px-4 py-3 text-base font-semibold text-orange-950">
          {pendingCount} sản phẩm chưa dán lại nhãn 30% — ưu tiên các thẻ viền
          cam phía trên
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDelete
            showOff30LabelSwitch
          />
        ))}
      </div>
    </div>
  );
}
