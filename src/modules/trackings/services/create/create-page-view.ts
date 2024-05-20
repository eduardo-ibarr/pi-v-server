import { ITrackingsRepository } from "../../models/trackings-repository";
import { CreatePageViewDTO } from "../../models/dtos/create-page-view-dto";
import { AppError } from "../../../../app/errors/app-error";
import { CreateEventDTO } from "../../models/dtos/create-event-dto";

interface ExecuteProps {
  data: Omit<CreatePageViewDTO, "event_id">;
  event: CreateEventDTO;
}

export class CreatePageViewService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute({ data, event }: ExecuteProps): Promise<void> {
    try {
      const eventId = await this.createEvent(event);
      await this.createPageView(data, eventId);
    } catch (error) {
      throw new AppError("Erro ao criar page view", 500);
    }
  }

  private async createEvent(data: CreateEventDTO): Promise<number> {
    try {
      const event = await this.trackingsRepository.createEvent(data);
      return event.id;
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      throw new AppError("Erro ao criar evento", 500);
    }
  }

  private async createPageView(
    data: Omit<CreatePageViewDTO, "event_id">,
    eventId: number
  ): Promise<void> {
    try {
      await this.trackingsRepository.createPageView({
        ...data,
        event_id: eventId,
      });
    } catch (error) {
      console.log(error);
      throw new AppError("Erro ao criar page view", 500);
    }
  }
}
