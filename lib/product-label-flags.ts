import { getProductBucket, type ProductBucket } from "@/lib/buckets";

type LabelFlags = {
  off_30_labeled: boolean;
  zero_waste_labeled: boolean;
  expired_collected: boolean;
};

type ExistingLabels = {
  expiry_date: string;
  off_30_labeled?: boolean | null;
  zero_waste_labeled?: boolean | null;
  expired_collected?: boolean | null;
};

function resolveFlag(
  current: boolean,
  oldBucket: ProductBucket | null,
  newBucket: ProductBucket,
  targetBucket: ProductBucket
): boolean {
  if (newBucket === targetBucket && oldBucket !== targetBucket) return false;
  if (newBucket !== targetBucket) return false;
  return current;
}

export function resolveLabelFlagsOnExpiryChange(
  existing: ExistingLabels | null,
  newExpiryDate: string
): LabelFlags {
  const oldBucket = existing
    ? getProductBucket(existing.expiry_date)
    : null;
  const newBucket = getProductBucket(newExpiryDate);

  return {
    off_30_labeled: resolveFlag(
      Boolean(existing?.off_30_labeled),
      oldBucket,
      newBucket,
      "off_30"
    ),
    zero_waste_labeled: resolveFlag(
      Boolean(existing?.zero_waste_labeled),
      oldBucket,
      newBucket,
      "zero_waste"
    ),
    expired_collected: resolveFlag(
      Boolean(existing?.expired_collected),
      oldBucket,
      newBucket,
      "expired"
    ),
  };
}
