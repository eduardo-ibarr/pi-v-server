export interface Event {
  id: number;
  event_type: "page_view" | "product_view";
  timestamp: Date;
  user_id: number | null;
  ip: string;
}
