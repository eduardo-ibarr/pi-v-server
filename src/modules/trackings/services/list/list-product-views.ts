import { AppError } from "../../../../app/errors/app-error";
import { ProductView } from "../../models/product-view";
import { ITrackingsRepository } from "../../models/trackings-repository";

export class ListProductViewsService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(): Promise<ProductView[]> {
    try {
      return await this.trackingsRepository.listProductViews();
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao listar visualizações de produto.", 500);
    }
  }
}
