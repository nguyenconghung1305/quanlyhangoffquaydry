import { LabeledDashboardGrid } from "@/components/labeled-dashboard-grid";
import type { Product } from "@/lib/types";

type ExpiredDashboardGridProps = {
  products: Product[];
  emptyMessage: string;
};

export function ExpiredDashboardGrid({
  products,
  emptyMessage,
}: ExpiredDashboardGridProps) {
  return (
    <LabeledDashboardGrid
      products={products}
      emptyMessage={emptyMessage}
      kind="expired"
      footerNote={
        <p className="text-base text-muted-foreground">
          Hàng hết hạn quá 7 ngày sẽ tự động xóa khỏi hệ thống.
        </p>
      }
    />
  );
}
