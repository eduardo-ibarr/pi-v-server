import { AppError } from "../../../../app/errors/app-error";
import { PageView } from "../../models/page-view";
import { ITrackingsRepository } from "../../models/trackings-repository";

export class ListPageViewsService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(): Promise<PageView[]> {
    try {
      return await this.trackingsRepository.listPageViews();
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao listar visualizações de página.", 500);
    }
  }
}
