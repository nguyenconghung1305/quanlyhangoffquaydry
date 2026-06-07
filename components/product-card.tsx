import {
  setExpiredCollected,
  setOff30Labeled,
  setZeroWasteLabeled,
} from "@/app/actions/products";
import { DeleteProductButton } from "@/components/delete-product-button";
import {
  getPendingRingClass,
  LabelToggleSwitch,
} from "@/components/label-toggle-switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDaysRemaining, getProductBucket } from "@/lib/buckets";
import { formatDate, formatPrice } from "@/lib/format";
import { getZeroWasteStickerAmount } from "@/lib/zero-waste-sticker";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  showDelete?: boolean;
  showOff30LabelSwitch?: boolean;
  showZeroWasteLabelSwitch?: boolean;
  showExpiredCollectedSwitch?: boolean;
};

export function ProductCard({
  product,
  showDelete = false,
  showOff30LabelSwitch = false,
  showZeroWasteLabelSwitch = false,
  showExpiredCollectedSwitch = false,
}: ProductCardProps) {
  const daysRemaining = getDaysRemaining(product.expiry_date);
  const bucket = getProductBucket(product.expiry_date);
  const isZeroWaste = bucket === "zero_waste";
  const stickerAmount = isZeroWaste
    ? getZeroWasteStickerAmount(product.price)
    : null;

  const needsOff30 = showOff30LabelSwitch && !product.off_30_labeled;
  const needsZeroWaste =
    showZeroWasteLabelSwitch && !product.zero_waste_labeled;
  const needsExpiredCollect =
    showExpiredCollectedSwitch && !product.expired_collected;

  const isDone =
    (showOff30LabelSwitch && product.off_30_labeled) ||
    (showZeroWasteLabelSwitch && product.zero_waste_labeled) ||
    (showExpiredCollectedSwitch && product.expired_collected);

  return (
    <Card
      className={cn(
        "flex h-full flex-col border-2 shadow-md transition-shadow hover:shadow-lg",
        needsOff30 && `ring-2 ${getPendingRingClass("off30")} ring-offset-2`,
        needsZeroWaste &&
          `ring-2 ${getPendingRingClass("zeroWaste")} ring-offset-2`,
        needsExpiredCollect &&
          `ring-2 ${getPendingRingClass("expired")} ring-offset-2`,
        isDone && "border-green-300/80 bg-green-50/30"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg leading-snug sm:text-xl">
            {product.name}
          </CardTitle>
          <Badge
            className={cn(
              "shrink-0 px-2.5 py-1 text-sm font-semibold",
              daysRemaining <= 0 && "text-base",
              daysRemaining <= 4 &&
                daysRemaining > 0 &&
                "bg-red-600 text-white hover:bg-red-600"
            )}
            variant={
              daysRemaining <= 0
                ? "destructive"
                : daysRemaining <= 4
                  ? "default"
                  : "secondary"
            }
          >
            {daysRemaining <= 0
              ? "Hết hạn"
              : `Còn ${daysRemaining} ngày`}
          </Badge>
        </div>
        <CardDescription className="text-base">
          Mã: {product.sku}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 text-base">
        <p>
          <span className="font-medium text-muted-foreground">Giá: </span>
          <span className="font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
        </p>
        <p>
          <span className="font-medium text-muted-foreground">Số lượng: </span>
          <span className="font-semibold">{product.quantity}</span>
        </p>
        <p>
          <span className="font-medium text-muted-foreground">HSD: </span>
          {formatDate(product.expiry_date)}
        </p>
        {isZeroWaste && stickerAmount !== null && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-900">
            Cần dán: {formatPrice(stickerAmount)}
          </p>
        )}
      </CardContent>
      {(showOff30LabelSwitch ||
        showZeroWasteLabelSwitch ||
        showExpiredCollectedSwitch ||
        showDelete) && (
        <CardFooter className="flex flex-col gap-3 border-t bg-muted/30 pt-4">
          {showOff30LabelSwitch && (
            <LabelToggleSwitch
              productId={product.id}
              labeled={product.off_30_labeled}
              kind="off30"
              onToggle={setOff30Labeled}
            />
          )}
          {showZeroWasteLabelSwitch && (
            <LabelToggleSwitch
              productId={product.id}
              labeled={product.zero_waste_labeled}
              kind="zeroWaste"
              onToggle={setZeroWasteLabeled}
            />
          )}
          {showExpiredCollectedSwitch && (
            <LabelToggleSwitch
              productId={product.id}
              labeled={product.expired_collected}
              kind="expired"
              onToggle={setExpiredCollected}
            />
          )}
          {showDelete && (
            <DeleteProductButton
              id={product.id}
              productName={product.name}
              className="w-full"
            />
          )}
        </CardFooter>
      )}
    </Card>
  );
}
