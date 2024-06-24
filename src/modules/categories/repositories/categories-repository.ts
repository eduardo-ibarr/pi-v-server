import { IDatabaseProvider } from "../../../providers/database/models/database-provider";
import { CreateCategoryDTO } from "../models/dtos/create-category-dto";
import { UpdateCategoryDTO } from "../models/dtos/update-category-dto";
import { Category } from "../models/category";
import { ICategoriesRepository } from "../models/categories-repository";

export class CategoriesRepository implements ICategoriesRepository {
  constructor(private databaseProvider: IDatabaseProvider) {}

  async create(data: CreateCategoryDTO): Promise<void> {
    const query = `
      INSERT INTO categories (name, description, is_active)
      VALUES (?, ?, ?)
    `;
    const values = [data.name, data.description, data.is_active ?? true];

    await this.databaseProvider.query(query, values);
  }

  async findById(id: number): Promise<Category | null> {
    const query = `
      SELECT * FROM categories
      WHERE id = ? AND deleted_at IS NULL
    `;
    const values = [id];
    const [result] = await this.databaseProvider.query(query, values);
    return result;
  }

  async list(): Promise<Category[]> {
    const query = `SELECT * FROM categories WHERE deleted_at IS NULL`;
    return await this.databaseProvider.query(query);
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<Category> {
    const query = `
      UPDATE categories
      SET name = ?, description = ?, is_active = ?
      WHERE id = ?
    `;
    const values = [data.name, data.description, data.is_active ?? true, id];
    await this.databaseProvider.query(query, values);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const query = `
      DELETE FROM categories
      WHERE id = ?
    `;
    const values = [id];
    await this.databaseProvider.query(query, values);
  }

  async softDelete(id: number): Promise<void> {
    const query = `
      UPDATE categories
      SET deleted_at = NOW(), is_active = FALSE
      WHERE id = ?
    `;
    const values = [id];
    await this.databaseProvider.query(query, values);
  }
}
