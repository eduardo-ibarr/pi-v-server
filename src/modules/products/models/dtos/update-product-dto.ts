export interface UpdateProductDTO extends Record<"id", number> {
  name?: string;
  description?: string;
  price?: number;
  image_url?: string;
  category_id?: number;
  is_active?: boolean;
}
