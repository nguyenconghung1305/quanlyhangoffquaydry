"use server";

import { revalidatePath } from "next/cache";
import { resolveLabelFlagsOnExpiryChange } from "@/lib/product-label-flags";
import { createClient } from "@/lib/supabase/server";
import type { ProductFormData } from "@/lib/types";

export type ActionResult = { error?: string; success?: boolean };

function validateForm(data: ProductFormData): string | null {
  if (!data.name.trim()) return "Tên sản phẩm không được để trống";
  if (!data.sku.trim()) return "Mã sản phẩm không được để trống";
  if (data.price < 0) return "Giá bán phải >= 0";
  if (data.quantity < 0 || !Number.isInteger(data.quantity))
    return "Số lượng phải là số nguyên >= 0";
  if (!data.expiry_date) return "Hạn sử dụng không được để trống";
  return null;
}

function revalidateProductPaths() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/dashboard/off-15");
  revalidatePath("/dashboard/off-30");
  revalidatePath("/dashboard/zero-waste");
  revalidatePath("/dashboard/expired");
}

export async function createProduct(
  data: ProductFormData
): Promise<ActionResult> {
  const validationError = validateForm(data);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("products").insert({
    name: data.name.trim(),
    sku: data.sku.trim().toUpperCase(),
    price: data.price,
    quantity: data.quantity,
    expiry_date: data.expiry_date,
    created_by: user?.id ?? null,
  });

  if (error) {
    if (error.code === "23505") return { error: "Mã sản phẩm đã tồn tại" };
    return { error: error.message };
  }

  revalidateProductPaths();
  return { success: true };
}

export async function updateProduct(
  id: string,
  data: ProductFormData
): Promise<ActionResult> {
  const validationError = validateForm(data);
  if (validationError) return { error: validationError };

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("products")
    .select(
      "expiry_date, off_30_labeled, zero_waste_labeled, expired_collected"
    )
    .eq("id", id)
    .single();

  const labelFlags = resolveLabelFlagsOnExpiryChange(
    existing ?? null,
    data.expiry_date
  );

  const { error } = await supabase
    .from("products")
    .update({
      name: data.name.trim(),
      sku: data.sku.trim().toUpperCase(),
      price: data.price,
      quantity: data.quantity,
      expiry_date: data.expiry_date,
      ...labelFlags,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") return { error: "Mã sản phẩm đã tồn tại" };
    return { error: error.message };
  }

  revalidateProductPaths();
  return { success: true };
}

export async function setOff30Labeled(
  id: string,
  labeled: boolean
): Promise<ActionResult> {
  return setLabelField(id, "off_30_labeled", labeled);
}

export async function setZeroWasteLabeled(
  id: string,
  labeled: boolean
): Promise<ActionResult> {
  return setLabelField(id, "zero_waste_labeled", labeled);
}

export async function setExpiredCollected(
  id: string,
  collected: boolean
): Promise<ActionResult> {
  return setLabelField(id, "expired_collected", collected);
}

async function setLabelField(
  id: string,
  field: "off_30_labeled" | "zero_waste_labeled" | "expired_collected",
  value: boolean
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({ [field]: value })
    .eq("id", id);

  if (error) return { error: error.message };

  // No revalidate — toggle updates in place; sort on next page load only
  return { success: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidateProductPaths();
  return { success: true };
}
