export interface CreateEventDTO {
  event_type: "page_view" | "product_view";
  timestamp: Date;
  user_id: number;
  ip: string;
  user_agent: string;
  referrer?: string;
}
