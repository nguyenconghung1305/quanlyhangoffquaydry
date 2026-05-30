import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("expiry_date", { ascending: true });

  if (error) {
    console.error("getProducts error:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    ...row,
    price: Number(row.price),
    off_30_labeled: Boolean(row.off_30_labeled),
  })) as Product[];
}
