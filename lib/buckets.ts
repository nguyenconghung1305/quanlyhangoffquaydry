import { differenceInCalendarDays, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const TIMEZONE = "Asia/Ho_Chi_Minh";

export type ProductBucket =
  | "normal"
  | "off_15"
  | "off_30"
  | "zero_waste"
  | "expired";

export const BUCKET_LABELS: Record<ProductBucket, string> = {
  normal: "Bình thường",
  off_15: "Hàng off 15%",
  off_30: "Hàng off 30%",
  zero_waste: "Zero waste",
  expired: "Đã hết hạn",
};

export function getTodayDateString(): string {
  return formatInTimeZone(new Date(), TIMEZONE, "yyyy-MM-dd");
}

export function getDaysRemaining(expiryDate: string): number {
  const today = parseISO(getTodayDateString());
  const expiry = parseISO(expiryDate);
  return differenceInCalendarDays(expiry, today);
}

export function getProductBucket(expiryDate: string): ProductBucket {
  const days = getDaysRemaining(expiryDate);
  if (days > 45) return "normal";
  if (days > 30) return "off_15";
  if (days > 4) return "off_30";
  if (days > 0) return "zero_waste";
  return "expired";
}

export function filterByBucket<T extends { expiry_date: string }>(
  items: T[],
  bucket: ProductBucket
): T[] {
  return items.filter((item) => getProductBucket(item.expiry_date) === bucket);
}
