import { ReservationItem } from "../reservation";

export interface CreateReservationDTO {
  user_id: number;
  total_amount: number;
  reservation_items: ReservationItem[];
}

export interface CreateReservationItemDTO {
  product_id: number;
  price: number;
}
