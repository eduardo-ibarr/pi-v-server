export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_active: boolean;
}
