export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  detail: string | null;
  price: number;
  image_url: string | null;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductInsert = Omit<Product, "id" | "created_at" | "updated_at">;

export type ProductUpdate = Partial<ProductInsert>;

export type ProductPreview = Pick<
  Product,
  "name" | "slug" | "description" | "price" | "stock"
> & {
  imageUrl: string | null;
  badge?: string;
};

export type ProductDetail = Product & {
  imageUrl: string | null;
};
