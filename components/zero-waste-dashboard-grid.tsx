import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

type ZeroWasteDashboardGridProps = {
  products: Product[];
  emptyMessage: string;
};

export function ZeroWasteDashboardGrid({
  products,
  emptyMessage,
}: ZeroWasteDashboardGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed bg-white/60 p-10 text-center text-lg text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  const sorted = [...products].sort((a, b) => {
    if (a.zero_waste_labeled === b.zero_waste_labeled) {
      return a.expiry_date.localeCompare(b.expiry_date);
    }
    return a.zero_waste_labeled ? 1 : -1;
  });

  const pendingCount = products.filter((p) => !p.zero_waste_labeled).length;

  return (
    <div className="space-y-5">
      {pendingCount > 0 && (
        <p className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-base font-semibold text-red-950">
          {pendingCount} sản phẩm chưa dán zero waste — ưu tiên các thẻ viền
          đỏ phía trên
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDelete
            showZeroWasteLabelSwitch
          />
        ))}
      </div>
    </div>
  );
}
