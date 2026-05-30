import { ProductFormDialog } from "@/components/product-form-dialog";
import { DeleteProductButton } from "@/components/delete-product-button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BUCKET_LABELS,
  getDaysRemaining,
  getProductBucket,
} from "@/lib/buckets";
import { formatDate, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

type ProductsTableProps = {
  products: Product[];
};

export function ProductsTable({ products }: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed bg-white/60 p-10 text-center text-lg text-muted-foreground">
        Chưa có sản phẩm. Nhấn &quot;Thêm sản phẩm&quot; để bắt đầu.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border-2 bg-white shadow-md">
      <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Mã</TableHead>
            <TableHead className="text-right">Giá</TableHead>
            <TableHead className="text-right">SL</TableHead>
            <TableHead>HSD</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const bucket = getProductBucket(product.expiry_date);
            const days = getDaysRemaining(product.expiry_date);
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell className="text-right">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell>{formatDate(product.expiry_date)}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {BUCKET_LABELS[bucket]}
                    {days > 0 && ` (${days}d)`}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <ProductFormDialog product={product} />
                    <DeleteProductButton
                      id={product.id}
                      productName={product.name}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
