import { AppError } from "../../../../app/errors/app-error";
import { Event } from "../../models/event";
import { ITrackingsRepository } from "../../models/trackings-repository";

export class ListEventsService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(): Promise<Event[]> {
    try {
      return await this.trackingsRepository.listEvents();
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao listar eventos.", 500);
    }
  }
}
