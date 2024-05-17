import { CreateEventDTO } from "./create-event-dto";

export interface CreateProductViewDTO extends CreateEventDTO {
  product_id: number;
}
