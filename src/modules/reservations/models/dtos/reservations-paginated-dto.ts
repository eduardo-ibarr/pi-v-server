import { Reservation } from "../reservation";

export interface ReservationsPaginatedDTO {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  items: Reservation[];
}
