export interface CreateEventDTO {
  event_type: "page_view" | "product_view";
  user_id: number | null;
  ip: string;
}
