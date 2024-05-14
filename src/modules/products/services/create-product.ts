import { IProductsRepository } from "../models/products-repository";
import { CreateProductDTO } from "../models/dtos/create-product-dto";
import { AppError } from "../../../app/errors/app-error";

export class CreateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: CreateProductDTO): Promise<void> {
    try {
      await this.productsRepository.create(data);
    } catch (error) {
      console.log(error);
      throw new AppError("Erro ao criar produto.", 500);
    }
  }
}
