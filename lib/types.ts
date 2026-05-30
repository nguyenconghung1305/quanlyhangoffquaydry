export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  expiry_date: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  off_30_labeled: boolean;
};

export type ProductFormData = {
  name: string;
  sku: string;
  price: number;
  quantity: number;
  expiry_date: string;
};
