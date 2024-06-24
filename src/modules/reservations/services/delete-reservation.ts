import { AppError } from "../../../app/errors/app-error";
import { IReservationsRepository } from "../models/reservations-repository";

export class DeleteReservationService {
  constructor(private reservationsRepository: IReservationsRepository) {}

  async execute(id: number): Promise<void> {
    const reservation = await this.reservationsRepository.findById(id);

    if (!reservation) {
      throw new AppError("Reserva não encontrada.", 404);
    }

    try {
      await this.reservationsRepository.softDelete(id);
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao deletar a reserva.", 500);
    }
  }
}
