import { createClient } from "@/lib/supabase/server";
import { normalizeProduct } from "@/lib/normalize-product";
import { purgeExpiredProducts } from "@/lib/purge-expired";
import type { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  await purgeExpiredProducts();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("expiry_date", { ascending: true });

  if (error) {
    console.error("getProducts error:", error.message);
    return [];
  }

  return (data ?? []).map((row) => normalizeProduct(row)) as Product[];
}
