"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
  LABEL_TOGGLE_CONFIG,
  type LabelToggleKind,
} from "@/lib/label-toggle-config";
import type { Product } from "@/lib/types";

type LabelField =
  | "off_30_labeled"
  | "zero_waste_labeled"
  | "expired_collected";

const FIELD_BY_KIND: Record<LabelToggleKind, LabelField> = {
  off30: "off_30_labeled",
  zeroWaste: "zero_waste_labeled",
  expired: "expired_collected",
};

function sortByPriority(products: Product[], field: LabelField): Product[] {
  return [...products].sort((a, b) => {
    if (a[field] === b[field]) {
      return a.expiry_date.localeCompare(b.expiry_date);
    }
    return a[field] ? 1 : -1;
  });
}

type LabeledDashboardGridProps = {
  products: Product[];
  emptyMessage: string;
  kind: LabelToggleKind;
  footerNote?: React.ReactNode;
};

export function LabeledDashboardGrid({
  products,
  emptyMessage,
  kind,
  footerNote,
}: LabeledDashboardGridProps) {
  const field = FIELD_BY_KIND[kind];
  const cfg = LABEL_TOGGLE_CONFIG[kind];

  // Sort once when page loads; order stays fixed until reload/navigation
  const [items, setItems] = useState(() => sortByPriority(products, field));

  useEffect(() => {
    setItems(sortByPriority(products, field));
  }, [products, field]);

  function handleLabelChange(productId: string, labeled: boolean) {
    setItems((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, [field]: labeled } : p))
    );
  }

  function handleDelete(productId: string) {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }

  const switchProps =
    kind === "off30"
      ? { showOff30LabelSwitch: true as const }
      : kind === "zeroWaste"
        ? { showZeroWasteLabelSwitch: true as const }
        : { showExpiredCollectedSwitch: true as const };

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed bg-white/60 p-10 text-center text-lg text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  const pendingCount = items.filter((p) => !p[field]).length;

  return (
    <div className="space-y-5">
      {pendingCount > 0 && (
        <p className={cfg.pendingBannerClass}>
          {pendingCount} sản phẩm {cfg.pendingBannerLabel}
        </p>
      )}
      {footerNote}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDelete
            {...switchProps}
            onLabelChange={(labeled) => handleLabelChange(product.id, labeled)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
