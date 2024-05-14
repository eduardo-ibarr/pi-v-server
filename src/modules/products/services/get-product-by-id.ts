import { AppError } from "../../../app/errors/app-error";
import { Product } from "../models/product";
import { IProductsRepository } from "../models/products-repository";

export class GetProductByIdService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: number): Promise<Product | null> {
    try {
      const product = await this.productsRepository.findById(id);

      if (!product) {
        throw new AppError("Produto não encontrado.", 404);
      }

      return product;
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao buscar produto por ID.", 500);
    }
  }
}
