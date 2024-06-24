import { CreateReservationDTO } from "./dtos/create-reservation-dto";
import { ReservationsPaginatedDTO } from "./dtos/reservations-paginated-dto";
import { QueryListReservationsDTO } from "./dtos/query-list-reservations-dto";
import { UpdateReservationDTO } from "./dtos/update-reservation-dto";
import { Reservation } from "./reservation";

export interface IReservationsRepository {
  create(data: CreateReservationDTO): Promise<void>;
  findById(id: number): Promise<Reservation | null>;
  list(data: QueryListReservationsDTO): Promise<ReservationsPaginatedDTO>;
  update(id: number, data: UpdateReservationDTO): Promise<Reservation>;
  delete(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;
}
