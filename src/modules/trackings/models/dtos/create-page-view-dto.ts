import { CreateEventDTO } from "./create-event-dto";

export interface CreatePageViewDTO extends CreateEventDTO {
  url: string;
}
