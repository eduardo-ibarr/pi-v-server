import { ITrackingsRepository } from "../../models/trackings-repository";
import { CreateEventDTO } from "../../models/dtos/create-event-dto";
import { AppError } from "../../../../app/errors/app-error";
import { Event } from "../../models/event";

export class CreateEventService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute(data: CreateEventDTO): Promise<Event> {
    try {
      return await this.trackingsRepository.createEvent(data);
    } catch (error) {
      console.error(error);

      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Erro ao criar evento.", 500);
      }
    }
  }
}
