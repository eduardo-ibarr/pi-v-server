import { CreateProductDTO } from "./dtos/create-product-dto";
import { UpdateProductDTO } from "./dtos/update-product-dto";
import { Product } from "./product";

export interface IProductsRepository {
  create(data: CreateProductDTO): Promise<void>;
  findById(id: number): Promise<Product | null>;
  list(): Promise<Product[]>;
  update(id: number, data: UpdateProductDTO): Promise<Product>;
  delete(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;
}
