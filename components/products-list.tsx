"use client";

import { useMemo, useState } from "react";
import { ProductsTable } from "@/components/products-table";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/types";
import { Search } from "lucide-react";

type ProductsListProps = {
  products: Product[];
};

export function ProductsList({ products }: ProductsListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm theo tên hoặc mã sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-11"
        />
      </div>
      {query.trim() && (
        <p className="text-base text-muted-foreground">
          {filtered.length} / {products.length} sản phẩm
        </p>
      )}
      <ProductsTable products={filtered} query={query.trim()} />
    </div>
  );
}
