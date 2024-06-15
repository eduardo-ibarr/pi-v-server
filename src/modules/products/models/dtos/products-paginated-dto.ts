import { Product } from "../product";

export interface ProductsPaginatedDTO {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  items: Product[];
}
