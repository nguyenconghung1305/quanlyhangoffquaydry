import { createClient } from "@/lib/supabase/server";
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

  return (data ?? []).map((row) => ({
    ...row,
    price: Number(row.price),
    off_30_labeled: Boolean(row.off_30_labeled),
    zero_waste_labeled: Boolean(row.zero_waste_labeled),
    expired_collected: Boolean(row.expired_collected),
  })) as Product[];
}
