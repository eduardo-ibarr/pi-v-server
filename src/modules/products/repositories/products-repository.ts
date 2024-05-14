import { IDatabaseProvider } from "../../../providers/database/models/database-provider";
import { CreateProductDTO } from "../models/dtos/create-product-dto";
import { UpdateProductDTO } from "../models/dtos/update-product-dto";
import { Product } from "../models/product";
import { IProductsRepository } from "../models/products-repository";

export class ProductsRepository implements IProductsRepository {
  constructor(private databaseProvider: IDatabaseProvider) {}

  async create(data: CreateProductDTO): Promise<void> {
    const query = `
      INSERT INTO products (name, description, price, image_url, category_id, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
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

  async list(): Promise<Product[]> {
    const query = `SELECT * FROM products`;
    return await this.databaseProvider.query(query);
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const query = `
      UPDATE products
      SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?, is_active = ?
      WHERE id = ?
    `;
    const values = [
      data.name,
      data.description,
      data.price,
      data.image_url,
      data.category_id,
      data.is_active ?? true,
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
}
