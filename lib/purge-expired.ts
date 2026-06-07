import { subDays, format, parseISO } from "date-fns";
import { getTodayDateString } from "@/lib/buckets";
import { createClient } from "@/lib/supabase/server";

/** Xóa sản phẩm hết hạn quá 7 ngày (theo ngày lịch VN). */
export async function purgeExpiredProducts(): Promise<void> {
  const supabase = await createClient();
  const today = parseISO(getTodayDateString());
  const cutoff = format(subDays(today, 7), "yyyy-MM-dd");

  const { error } = await supabase
    .from("products")
    .delete()
    .lte("expiry_date", cutoff);

  if (error) {
    console.error("purgeExpiredProducts error:", error.message);
  }
}
