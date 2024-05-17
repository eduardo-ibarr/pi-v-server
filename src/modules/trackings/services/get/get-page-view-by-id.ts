import { ITrackingsRepository } from "../../models/trackings-repository";
import { AppError } from "../../../../app/errors/app-error";
import { PageView } from "../../models/page-view";

export class GetPageViewByIdService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(id: number): Promise<PageView | null> {
    try {
      const pageView = await this.trackingsRepository.getPageViewById(id);
      if (!pageView) {
        throw new AppError("Visualização de página não encontrada.", 404);
      }
      return pageView;
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Erro ao buscar visualização de página.", 500);
      }
    }
  }
}
