import { LabeledDashboardGrid } from "@/components/labeled-dashboard-grid";
import type { Product } from "@/lib/types";

type ZeroWasteDashboardGridProps = {
  products: Product[];
  emptyMessage: string;
};

export function ZeroWasteDashboardGrid({
  products,
  emptyMessage,
}: ZeroWasteDashboardGridProps) {
  return (
    <LabeledDashboardGrid
      products={products}
      emptyMessage={emptyMessage}
      kind="zeroWaste"
    />
  );
}
