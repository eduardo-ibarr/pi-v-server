import { IDatabaseProvider } from "../../../providers/database/models/database-provider";
import { CreateProductDTO } from "../models/dtos/create-product-dto";
import { ProductsPaginatedDTO } from "../models/dtos/products-paginated-dto";
import { QueryListProductsDTO } from "../models/dtos/query-list-products-dto";
import { UpdateProductDTO } from "../models/dtos/update-product-dto";
import { Product } from "../models/product";
import { IProductsRepository } from "../models/products-repository";

export class ProductsRepository implements IProductsRepository {
  constructor(private databaseProvider: IDatabaseProvider) {}

  async create(data: CreateProductDTO): Promise<void> {
    const query = `
        INSERT INTO products (
          name, description, price, image_url, category_id, is_active
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const values = [
      data.name,
      data.description,
      data.price,
      data.image_url,
      data.category_id,
      data.is_active ?? true,
    ];

    await this.databaseProvider.query(query, values);
  }

  async findById(id: number): Promise<Product | null> {
    const query = `
        SELECT * FROM products
        WHERE id = ?
      `;
    const values = [id];
    const [result] = await this.databaseProvider.query(query, values);
    return result;
  }

  async list({
    page,
    limit,
    sort,
    search,
  }: QueryListProductsDTO): Promise<ProductsPaginatedDTO> {
    page = page || 1;
    limit = limit || 10;

    const offset =
      parseInt(String(page), 10) > 0
        ? (parseInt(String(page), 10) - 1) * parseInt(String(limit), 10)
        : 0;
    const limitNum =
      parseInt(String(limit), 10) > 0 ? parseInt(String(limit), 10) : 10;

    let query = `
      SELECT 
        products.id, 
        products.name,
        products.description, 
        products.price, 
        products.image_url, 
        categories.name AS category_name,
        products.created_at, 
        products.updated_at, 
        products.is_active,
        products.deleted_at,
        products.status
      FROM products
      INNER JOIN categories ON products.category_id = categories.id
    `;

    if (search) {
      query += ` WHERE products.name LIKE ? OR products.description LIKE ?`;
    }

    if (sort) {
      const [field, order] = sort.split(":");
      query += ` ORDER BY ${field} ${order.toUpperCase()}`;
    }

    query += ` LIMIT ?, ?`;

    const values = search
      ? [`%${search}%`, `%${search}%`, offset, limitNum]
      : [offset, limitNum];
    const items = await this.databaseProvider.query(query, values);

    const countQuery = `SELECT COUNT(*) AS totalItems FROM products`;
    const totalItemsResult = await this.databaseProvider.query(countQuery);
    const totalItems = totalItemsResult[0].totalItems;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      page,
      limit,
      totalPages,
      totalItems,
      items,
    };
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const query = `
        UPDATE products
        SET 
          name = ?, 
          description = ?, 
          price = ?, 
          image_url = ?, 
          category_id = ?,
          is_active = ?,
          status = ?
        WHERE id = ?
      `;
    const values = [
      data.name,
      data.description,
      data.price,
      data.image_url,
      data.category_id,
      data.is_active ?? true,
      data.status,
      id,
    ];
    await this.databaseProvider.query(query, values);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const query = `
      DELETE FROM products
      WHERE id = ?
    `;
    const values = [id];
    await this.databaseProvider.query(query, values);
  }

  async softDelete(id: number): Promise<void> {
    const query = `
      UPDATE products
      SET deleted_at = NOW(), is_active = FALSE
      WHERE id = ?
    `;
    const values = [id];
    await this.databaseProvider.query(query, values);
  }
}
