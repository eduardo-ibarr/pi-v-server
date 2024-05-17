import { ITrackingsRepository } from "../../models/trackings-repository";
import { AppError } from "../../../../app/errors/app-error";
import { ProductView } from "../../models/product-view";

export class GetProductViewByIdService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(id: number): Promise<ProductView | null> {
    try {
      const productView = await this.trackingsRepository.getProductViewById(id);
      if (!productView) {
        throw new AppError("Visualização de produto não encontrada.", 404);
      }
      return productView;
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Erro ao buscar visualização de produto.", 500);
      }
    }
  }
}
