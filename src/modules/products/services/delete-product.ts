import { AppError } from "../../../app/errors/app-error";
import { IProductsRepository } from "../models/products-repository";

export class DeleteProductService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: number): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Produto não encontrado.", 404);
    }

    try {
      await this.productsRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao deletar produto.", 500);
    }
  }
}
