import { ReservationItem } from "../reservation";

export interface UpdateReservationDTO extends Record<"id", number> {
  user_id?: number;
  total_amount?: number;
  reservation_items?: ReservationItem[];
}

export interface UpdateReservationItemDTO extends Record<"id", number> {
  product_id?: number;
  price?: number;
  quantity?: number;
}
