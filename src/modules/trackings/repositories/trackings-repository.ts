import { IDatabaseProvider } from "../../../providers/database/models/database-provider";
import { CreateEventDTO } from "../models/dtos/create-event-dto";
import { CreatePageViewDTO } from "../models/dtos/create-page-view-dto";
import { Event } from "../models/event";
import { PageView } from "../models/page-view";
import { ProductView } from "../models/product-view";
import { ITrackingsRepository } from "../models/trackings-repository";

export class TrackingsRepository implements ITrackingsRepository {
  constructor(private databaseProvider: IDatabaseProvider) {}

  async createEvent(event: CreateEventDTO): Promise<Event> {
    const query = `
      INSERT INTO events (event_type, user_id, ip, user_agent, referrer)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      event.event_type,
      event.user_id,
      event.ip,
      event.user_agent,
      event.referrer,
    ];
    const result = await this.databaseProvider.query(query, values);
    return { ...event, id: result.insertId as number };
  }

  async createPageView(pageView: CreatePageViewDTO): Promise<void> {
    const event = await this.createEvent(pageView);
    const query = `
      INSERT INTO page_views (event_id, url)
      VALUES (?, ?)
    `;
    const values = [event.id, pageView.url];
    await this.databaseProvider.query(query, values);
  }

  async createProductView(productView: ProductView): Promise<void> {
    const event = await this.createEvent(productView);
    const query = `
      INSERT INTO product_views (event_id, product_id)
      VALUES (?, ?)
    `;
    const values = [event.id, productView.product_id];
    await this.databaseProvider.query(query, values);
  }

  async getEventById(eventId: number): Promise<Event | null> {
    const query = `
      SELECT * FROM events
      WHERE id = ?
    `;
    const values = [eventId];
    const [result] = await this.databaseProvider.query(query, values);
    return result || null;
  }

  async getPageViewById(eventId: number): Promise<PageView | null> {
    const query = `
      SELECT e.*, pv.url
      FROM events e
      JOIN page_views pv ON e.id = pv.event_id
      WHERE e.id = ?
    `;
    const values = [eventId];
    const [result] = await this.databaseProvider.query(query, values);
    return result || null;
  }

  async getProductViewById(eventId: number): Promise<ProductView | null> {
    const query = `
      SELECT e.*, p.product_id
      FROM events e
      JOIN product_views p ON e.id = p.event_id
      WHERE e.id = ?
    `;
    const values = [eventId];
    const [result] = await this.databaseProvider.query(query, values);
    return result || null;
  }

  async getEventsByUserId(userId: number): Promise<Event[]> {
    const query = `
      SELECT * FROM events
      WHERE user_id = ?
    `;
    const values = [userId];
    return await this.databaseProvider.query(query, values);
  }

  async getPageViewsByUserId(userId: number): Promise<PageView[]> {
    const query = `
      SELECT e.*, pv.url
      FROM events e
      JOIN page_views pv ON e.id = pv.event_id
      WHERE e.user_id = ? AND e.event_type = 'page_view'
    `;
    const values = [userId];
    return await this.databaseProvider.query(query, values);
  }

  async getProductViewsByUserId(userId: number): Promise<ProductView[]> {
    const query = `
      SELECT e.*, p.product_id
      FROM events e
      JOIN product_views p ON e.id = p.event_id
      WHERE e.user_id = ? AND e.event_type = 'product_view'
    `;
    const values = [userId];
    return await this.databaseProvider.query(query, values);
  }

  async listEvents(): Promise<Event[]> {
    const query = `SELECT * FROM events`;
    return await this.databaseProvider.query(query);
  }

  async listPageViews(): Promise<PageView[]> {
    const query = `
      SELECT e.*, pv.url
      FROM events e
      JOIN page_views pv ON e.id = pv.event_id
      WHERE e.event_type = 'page_view'
    `;
    return await this.databaseProvider.query(query);
  }

  async listProductViews(): Promise<ProductView[]> {
    const query = `
      SELECT e.*, p.product_id
      FROM events e
      JOIN product_views p ON e.id = p.event_id
      WHERE e.event_type = 'product_view'
    `;
    return await this.databaseProvider.query(query);
  }
}
