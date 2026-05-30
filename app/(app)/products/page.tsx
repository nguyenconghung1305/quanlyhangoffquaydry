import { ProductFormDialog } from "@/components/product-form-dialog";
import { ProductsTable } from "@/components/products-table";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Quản lý sản phẩm</h1>
          <p className="page-desc">
            Thêm, sửa, xóa sản phẩm — bao gồm cả hàng còn trên 45 ngày.
          </p>
        </div>
        <ProductFormDialog />
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
