import { IDatabaseProvider } from "../../../providers/database/models/database-provider";
import {
  CreateReservationDTO,
  CreateReservationItemDTO,
} from "../models/dtos/create-reservation-dto";
import { QueryListReservationsDTO } from "../models/dtos/query-list-reservations-dto";
import { ReservationsPaginatedDTO } from "../models/dtos/reservations-paginated-dto";
import {
  UpdateReservationDTO,
  UpdateReservationItemDTO,
} from "../models/dtos/update-reservation-dto";
import { Reservation, ReservationItem } from "../models/reservation";
import { IReservationsRepository } from "../models/reservations-repository";

export class ReservationsRepository implements IReservationsRepository {
  constructor(private databaseProvider: IDatabaseProvider) {}

  async create(data: CreateReservationDTO): Promise<void> {
    const connection = await this.databaseProvider.getConnection();
    try {
      await connection.beginTransaction();

      const reservationQuery = `
        INSERT INTO reservations (
          user_id, total_amount, reservation_timestamp
        )
        VALUES (?, ?, NOW())
      `;
      const reservationValues = [data.user_id, data.total_amount];
      const reservationResult = await connection.query(
        reservationQuery,
        reservationValues
      );

      const reservationId = reservationResult[0].insertId;

      for (const item of data.reservation_items) {
        const itemQuery = `
          INSERT INTO reservation_items (
            reservation_id, product_id, price
          )
          VALUES (?, ?, ?)
        `;
        const itemValues = [reservationId, item.product_id, item.price];
        await connection.query(itemQuery, itemValues);
      }

      const updateProductQuery = `
        UPDATE products
        SET status = 'unavailable'
        WHERE id = ?
      `;

      for (const item of data.reservation_items) {
        const productValues = [item.product_id];
        await connection.query(updateProductQuery, productValues);
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async findById(id: number): Promise<Reservation | null> {
    const query = `
        SELECT 
            r.*,
            ri.product_id, ri.price,
            u.name as user_name, u.phone as user_phone,
            p.name as product_name, p.description as product_description, p.image_url as product_image_url
        FROM reservations r
        LEFT JOIN users u ON r.user_id = u.id
        LEFT JOIN reservation_items ri ON r.id = ri.reservation_id
        LEFT JOIN products p ON ri.product_id = p.id
        WHERE r.id = ?
    `;
    const values = [id];
    const results = await this.databaseProvider.query(query, values);
    if (!results.length) return null;

    const reservation = {
      ...results[0],
      reservation_items: results.map((item) => ({
        product_id: item.product_id,
        user_name: item.user_name,
        user_phone: item.user_phone,
        price: item.price,
        product_name: item.product_name,
        product_description: item.product_description,
        product_image_url: item.product_image_url,
      })),
    };

    return reservation;
  }

  async list({
    page,
    limit,
    sort,
    search,
  }: QueryListReservationsDTO): Promise<ReservationsPaginatedDTO> {
    page = parseInt(String(page)) || 1;
    limit = parseInt(String(limit)) || 10;
    const offset = (page - 1) * limit;

    let query = `
    SELECT 
        r.id, r.user_id, r.total_amount, r.reservation_timestamp,
        ri.product_id, ri.price,
        u.name as user_name, u.phone as user_phone,
        p.name as product_name, p.description as product_description, p.image_url as product_image_url
    FROM reservations r
    LEFT JOIN users u ON r.user_id = u.id
    LEFT JOIN reservation_items ri ON r.id = ri.reservation_id
    LEFT JOIN products p ON ri.product_id = p.id
`;

    if (search) {
      query += ` WHERE r.user_id = ?`;
    }

    if (sort) {
      const [field, order] = sort.split(":");
      query += ` ORDER BY ${
        field === "name" ? "u.name" : field
      } ${order.toUpperCase()}`;
    } else {
      query += ` ORDER BY u.name ASC`;
    }

    query += ` LIMIT ?, ?`;

    const values = search ? [search, offset, limit] : [offset, limit];
    const results = await this.databaseProvider.query(query, values);

    const reservations = results.reduce((acc, item) => {
      const { id } = item;
      if (!acc[id]) {
        acc[id] = {
          id: item.id,
          user_id: item.user_id,
          user_name: item.user_name,
          user_phone: item.user_phone,
          total_amount: item.total_amount,
          reservation_timestamp: item.reservation_timestamp,
          reservation_items: [],
        };
      }
      acc[id].reservation_items.push({
        product_id: item.product_id,
        price: item.price,
        product_name: item.product_name,
        product_description: item.product_description,
        product_image_url: item.product_image_url,
      });
      return acc;
    }, {});

    const countQuery = `SELECT COUNT(*) AS totalItems FROM reservations`;
    const totalItemsResult = await this.databaseProvider.query(countQuery);
    const totalItems = totalItemsResult[0].totalItems;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      page,
      limit,
      totalPages,
      totalItems,
      items: Object.values(reservations),
    };
  }

  async update(id: number, data: UpdateReservationDTO): Promise<Reservation> {
    const connection = await this.databaseProvider.getConnection();
    try {
      await connection.beginTransaction();

      const updateReservationQuery = `
        UPDATE reservations
        SET 
          user_id = ?, 
          total_amount = ?,
          reservation_timestamp = NOW()
        WHERE id = ?
      `;
      const reservationValues = [data.user_id, data.total_amount, id];
      await connection.query(updateReservationQuery, reservationValues);

      const deleteItemsQuery = `DELETE FROM reservation_items WHERE reservation_id = ?`;
      await connection.query(deleteItemsQuery, [id]);

      for (const item of data.reservation_items) {
        const itemQuery = `
          INSERT INTO reservation_items (
            reservation_id, product_id, price
          )
          VALUES (?, ?, ?)
        `;
        const itemValues = [id, item.product_id, item.price];
        await connection.query(itemQuery, itemValues);
      }

      await connection.commit();
      return this.findById(id);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async delete(id: number): Promise<void> {
    const deleteItemsQuery = `
      DELETE FROM reservation_items WHERE reservation_id = ?
    `;

    const productIdQuery = `
      SELECT product_id FROM reservation_items WHERE reservation_id = ?
    `;

    const productUpdateQuery = `
      UPDATE products
      SET deleted_at = NOW()
      WHERE id = ?
    `;

    const query = `
      DELETE FROM reservations
      WHERE id = ?
    `;
    const values = [id];

    const connection = await this.databaseProvider.getConnection();
    try {
      await connection.beginTransaction();

      const productIds = await connection.query(productIdQuery, [id]);
      for (const { product_id } of productIds) {
        await connection.query(productUpdateQuery, [product_id]);
      }

      await connection.query(deleteItemsQuery, [id]);
      await connection.query(query, values);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async softDelete(id: number): Promise<void> {
    const query = `
      UPDATE reservations
      SET deleted_at = NOW()
      WHERE id = ?
    `;
    const values = [id];
    await this.databaseProvider.query(query, values);
  }
}
