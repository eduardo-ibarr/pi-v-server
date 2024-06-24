export interface Reservation {
  id: number;
  user_id: number;
  total_amount: number;
  reservation_items: ReservationItem[];
}

export interface ReservationItem {
  product_id: number;
  price: number;
  quantity: number;
}
