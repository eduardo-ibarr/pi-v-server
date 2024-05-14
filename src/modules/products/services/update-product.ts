import { AppError } from "../../../app/errors/app-error";
import { UpdateProductDTO } from "../models/dtos/update-product-dto";
import { Product } from "../models/product";
import { IProductsRepository } from "../models/products-repository";

export class UpdateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: UpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById(data.id);

    if (!product) {
      throw new AppError("Produto não encontrado.", 404);
    }

    const updatedProduct = await this.productsRepository.update(data.id, data);

    return updatedProduct;
  }
}
