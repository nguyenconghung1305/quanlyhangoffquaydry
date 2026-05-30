"use client";

import { useState, useTransition } from "react";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Product } from "@/lib/types";
import { Pencil, Plus } from "lucide-react";

type ProductFormDialogProps = {
  product?: Product;
};

const emptyForm = {
  name: "",
  sku: "",
  price: "",
  quantity: "",
  expiry_date: "",
};

export function ProductFormDialog({ product }: ProductFormDialogProps) {
  const isEdit = Boolean(product);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [form, setForm] = useState(() =>
    product
      ? {
          name: product.name,
          sku: product.sku,
          price: String(product.price),
          quantity: String(product.quantity),
          expiry_date: product.expiry_date,
        }
      : emptyForm
  );

  function resetForm() {
    setForm(
      product
        ? {
            name: product.name,
            sku: product.sku,
            price: String(product.price),
            quantity: String(product.quantity),
            expiry_date: product.expiry_date,
          }
        : emptyForm
    );
    setError(null);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) resetForm();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      name: form.name,
      sku: form.sku,
      price: Number(form.price),
      quantity: Number(form.quantity),
      expiry_date: form.expiry_date,
    };

    startTransition(async () => {
      const result = isEdit
        ? await updateProduct(product!.id, payload)
        : await createProduct(payload);

      if (result.error) {
        setError(result.error);
        return;
      }

      setOpen(false);
      if (!isEdit) setForm(emptyForm);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button type="button" />}>
        {isEdit ? (
          <>
            <Pencil className="size-4" />
            Sửa
          </>
        ) : (
          <>
            <Plus className="size-4" />
            Thêm sản phẩm
          </>
        )}
      </DialogTrigger>
      <DialogContent className="gap-5 text-base sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">Mã sản phẩm</Label>
            <Input
              id="sku"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Giá bán (VND)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={1000}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Số lượng</Label>
              <Input
                id="quantity"
                type="number"
                min={0}
                step={1}
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiry_date">Hạn sử dụng</Label>
            <Input
              id="expiry_date"
              type="date"
              value={form.expiry_date}
              onChange={(e) =>
                setForm({ ...form, expiry_date: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {pending ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
