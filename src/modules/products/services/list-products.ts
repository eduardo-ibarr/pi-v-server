import { ProductsPaginatedDTO } from "../models/dtos/products-paginated-dto";
import { QueryListProductsDTO } from "../models/dtos/query-list-products-dto";
import { Product } from "../models/product";
import { IProductsRepository } from "../models/products-repository";

export class ListProductsService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: QueryListProductsDTO): Promise<ProductsPaginatedDTO> {
    return this.productsRepository.list(data);
  }
}
