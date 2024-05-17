import { ITrackingsRepository } from "../../models/trackings-repository";
import { CreateProductViewDTO } from "../../models/dtos/create-product-view-dto";
import { AppError } from "../../../../app/errors/app-error";

export class CreateProductViewService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(data: CreateProductViewDTO): Promise<void> {
    try {
      return await this.trackingsRepository.createProductView(data);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Erro ao criar visualização de produto.", 500);
      }
    }
  }
}
