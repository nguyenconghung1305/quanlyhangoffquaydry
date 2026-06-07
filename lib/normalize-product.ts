import type { Product } from "@/lib/types";

export function normalizeProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    sku: String(row.sku ?? ""),
    price: Number(row.price ?? 0),
    quantity: Number(row.quantity ?? 0),
    expiry_date: String(row.expiry_date ?? ""),
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
    created_by: row.created_by ? String(row.created_by) : null,
    off_30_labeled: Boolean(row.off_30_labeled),
    zero_waste_labeled: Boolean(row.zero_waste_labeled),
    expired_collected: Boolean(row.expired_collected),
  };
}
