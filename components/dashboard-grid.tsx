"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

type DashboardGridProps = {
  products: Product[];
  emptyMessage: string;
};

export function DashboardGrid({ products, emptyMessage }: DashboardGridProps) {
  const [items, setItems] = useState(products);

  useEffect(() => {
    setItems(products);
  }, [products]);

  function handleDelete(productId: string) {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed bg-white/60 p-10 text-center text-lg text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showDelete
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
}
