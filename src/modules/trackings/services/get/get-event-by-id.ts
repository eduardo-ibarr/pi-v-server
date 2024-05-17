import { ITrackingsRepository } from "../../models/trackings-repository";
import { AppError } from "../../../../app/errors/app-error";
import { Event } from "../../models/event";

export class GetEventByIdService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(eventId: number): Promise<Event | null> {
    try {
      const event = await this.trackingsRepository.getEventById(eventId);
      if (!event) {
        throw new AppError("Evento não encontrado.", 404);
      }
      return event;
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Erro ao buscar evento.", 500);
      }
    }
  }
}
