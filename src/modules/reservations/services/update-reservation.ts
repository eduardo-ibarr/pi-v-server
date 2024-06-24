import { AppError } from "../../../app/errors/app-error";
import { UpdateReservationDTO } from "../models/dtos/update-reservation-dto";
import { Reservation } from "../models/reservation";
import { IReservationsRepository } from "../models/reservations-repository";

export class UpdateReservationService {
  constructor(private reservationsRepository: IReservationsRepository) {}

  async execute(data: UpdateReservationDTO): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findById(data.id);

    if (!reservation) {
      throw new AppError("Reserva não encontrada.", 404);
    }

    const updatedReservation = await this.reservationsRepository.update(
      data.id,
      data
    );

    return updatedReservation;
  }
}
