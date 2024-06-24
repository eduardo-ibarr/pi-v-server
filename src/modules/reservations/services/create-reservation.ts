import { IReservationsRepository } from "../models/reservations-repository";
import { CreateReservationDTO } from "../models/dtos/create-reservation-dto";
import { AppError } from "../../../app/errors/app-error";

export class CreateReservationService {
  constructor(private reservationRepository: IReservationsRepository) {}

  async execute(data: CreateReservationDTO): Promise<void> {
    try {
      await this.reservationRepository.create(data);
    } catch (error) {
      console.log(error);
      throw new AppError("Erro ao criar a reserva.", 500);
    }
  }
}
