import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

type ExpiredDashboardGridProps = {
  products: Product[];
  emptyMessage: string;
};

export function ExpiredDashboardGrid({
  products,
  emptyMessage,
}: ExpiredDashboardGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed bg-white/60 p-10 text-center text-lg text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  const sorted = [...products].sort((a, b) => {
    if (a.expired_collected === b.expired_collected) {
      return a.expiry_date.localeCompare(b.expiry_date);
    }
    return a.expired_collected ? 1 : -1;
  });

  const pendingCount = products.filter((p) => !p.expired_collected).length;

  return (
    <div className="space-y-5">
      {pendingCount > 0 && (
        <p className="rounded-xl border-2 border-zinc-400 bg-zinc-100 px-4 py-3 text-base font-semibold text-zinc-900">
          {pendingCount} sản phẩm chưa gom — ưu tiên các thẻ viền xám phía
          trên
        </p>
      )}
      <p className="text-base text-muted-foreground">
        Hàng hết hạn quá 7 ngày sẽ tự động xóa khỏi hệ thống.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDelete
            showExpiredCollectedSwitch
          />
        ))}
      </div>
    </div>
  );
}
