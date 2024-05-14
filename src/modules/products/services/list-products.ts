import { Product } from "../models/product";
import { IProductsRepository } from "../models/products-repository";

export class ListProductsService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(): Promise<Product[]> {
    return this.productsRepository.list();
  }
}
