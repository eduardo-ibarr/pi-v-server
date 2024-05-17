import { CreateEventDTO } from "./dtos/create-event-dto";
import { CreatePageViewDTO } from "./dtos/create-page-view-dto";
import { CreateProductViewDTO } from "./dtos/create-product-view-dto";
import { Event } from "./event";
import { PageView } from "./page-view";
import { ProductView } from "./product-view";

export interface ITrackingsRepository {
  createEvent(event: CreateEventDTO): Promise<Event>;
  createPageView(pageView: CreatePageViewDTO): Promise<void>;
  createProductView(productView: CreateProductViewDTO): Promise<void>;

  getEventById(eventId: number): Promise<Event | null>;
  getPageViewById(eventId: number): Promise<PageView | null>;
  getProductViewById(eventId: number): Promise<ProductView | null>;

  getEventsByUserId(userId: number): Promise<Event[]>;
  getPageViewsByUserId(userId: number): Promise<PageView[]>;
  getProductViewsByUserId(userId: number): Promise<ProductView[]>;

  listEvents(): Promise<Event[]>;
  listPageViews(): Promise<PageView[]>;
  listProductViews(): Promise<ProductView[]>;
}
