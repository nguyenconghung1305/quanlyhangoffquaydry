/** Số tiền dán nhãn zero waste theo giá bán (VND). */
const STICKER_TIERS: { maxPrice: number; sticker: number }[] = [
  { maxPrice: 20_000, sticker: 2_000 },
  { maxPrice: 35_000, sticker: 10_000 },
  { maxPrice: 50_000, sticker: 15_000 },
  { maxPrice: 70_000, sticker: 20_000 },
  { maxPrice: 90_000, sticker: 25_000 },
  { maxPrice: 135_000, sticker: 35_000 },
  { maxPrice: 220_000, sticker: 50_000 },
  { maxPrice: 500_000, sticker: 100_000 },
];

export function getZeroWasteStickerAmount(price: number): number {
  if (price <= 0) return STICKER_TIERS[0].sticker;

  for (const tier of STICKER_TIERS) {
    if (price <= tier.maxPrice) return tier.sticker;
  }

  return 200_000;
}
