import { ITrackingsRepository } from "../../models/trackings-repository";
import { CreateProductViewDTO } from "../../models/dtos/create-product-view-dto";
import { AppError } from "../../../../app/errors/app-error";
import { CreateEventDTO } from "../../models/dtos/create-event-dto";

interface ExecuteProps {
  data: Omit<CreateProductViewDTO, "event_id">;
  event: CreateEventDTO;
}

export class CreateProductViewService {
  constructor(private trackingsRepository: ITrackingsRepository) {}

  async execute({ data, event }: ExecuteProps): Promise<void> {
    const eventId = await this.createEvent(event);
    await this.createProductView(data, eventId);
  }

  private async createEvent(data: CreateEventDTO): Promise<number> {
    try {
      const event = await this.trackingsRepository.createEvent(data);
      return event.id;
    } catch (error) {
      console.error("Erro ao criar evento:", error);

      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        throw new AppError("Usuário não encontrado.", 404);
      } else {
        throw new AppError("Erro ao criar evento.", 500);
      }
    }
  }

  private async createProductView(
    data: Omit<CreateProductViewDTO, "event_id">,
    eventId: number
  ): Promise<void> {
    try {
      await this.trackingsRepository.createProductView({
        ...data,
        event_id: eventId,
      });
    } catch (error) {
      console.error("Erro ao criar page view:", error);

      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        throw new AppError("Produto não encontrado.", 404);
      } else {
        throw new AppError("Erro ao criar page view.", 500);
      }
    }
  }
}
