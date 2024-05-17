import { ITrackingsRepository } from "../../models/trackings-repository";
import { CreatePageViewDTO } from "../../models/dtos/create-page-view-dto";
import { AppError } from "../../../../app/errors/app-error";

export class CreatePageViewService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(data: CreatePageViewDTO): Promise<void> {
    try {
      await this.trackingsRepository.createPageView(data);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Erro ao criar visualização de página.", 500);
      }
    }
  }
}
