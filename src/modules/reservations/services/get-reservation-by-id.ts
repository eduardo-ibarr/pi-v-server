import { AppError } from "../../../app/errors/app-error";
import { Reservation } from "../models/reservation";
import { IReservationsRepository } from "../models/reservations-repository";

export class GetReservationByIdService {
  constructor(private reservationsRepository: IReservationsRepository) {}

  async execute(id: number): Promise<Reservation | null> {
    try {
      const reservation = await this.reservationsRepository.findById(id);

      if (!reservation) {
        throw new AppError("Reserva não encontrada.", 404);
      }

      return reservation;
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao buscar a reserva por ID.", 500);
    }
  }
}
