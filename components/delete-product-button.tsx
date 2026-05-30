"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

type DeleteProductButtonProps = {
  id: string;
  productName: string;
  className?: string;
};

export function DeleteProductButton({
  id,
  productName,
  className,
}: DeleteProductButtonProps) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Xóa sản phẩm "${productName}"? Hành động không thể hoàn tác.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      await deleteProduct(id);
    });
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={pending}
      className={cn(className)}
    >
      <Trash2 className="size-4" />
      {pending ? "..." : "Xóa"}
    </Button>
  );
}
