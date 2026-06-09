import { LabeledDashboardGrid } from "@/components/labeled-dashboard-grid";
import type { Product } from "@/lib/types";

type Off30DashboardGridProps = {
  products: Product[];
  emptyMessage: string;
};

export function Off30DashboardGrid({
  products,
  emptyMessage,
}: Off30DashboardGridProps) {
  return (
    <LabeledDashboardGrid
      products={products}
      emptyMessage={emptyMessage}
      kind="off30"
    />
  );
}
