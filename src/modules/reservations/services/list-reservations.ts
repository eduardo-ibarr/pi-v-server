import { ReservationsPaginatedDTO } from "../models/dtos/reservations-paginated-dto";
import { QueryListReservationsDTO } from "../models/dtos/query-list-reservations-dto";
import { IReservationsRepository } from "../models/reservations-repository";

export class ListReservationsService {
  constructor(private reservationsRepository: IReservationsRepository) {}

  async execute(
    data: QueryListReservationsDTO
  ): Promise<ReservationsPaginatedDTO> {
    return this.reservationsRepository.list(data);
  }
}
