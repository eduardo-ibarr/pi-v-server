import { IDatabaseProvider } from "../../../providers/database/models/database-provider";
import { CreateUserDTO } from "../models/dtos/create-user-dto";
import { UpdateUserDTO } from "../models/dtos/update-user-dto";
import { User } from "../models/user";
import { IUsersRepository } from "../models/users-repository";

export class UsersRepository implements IUsersRepository {
  constructor(private databaseProvider: IDatabaseProvider) {}

  async updateResetPasswordToken(
    email: string,
    token: string,
    expiry: Date
  ): Promise<void> {
    const query = `
      UPDATE users
      SET password_reset_token = ?, password_reset_token_expiry = ?
      WHERE email = ?
    `;
    const values = [token, expiry, email];
    await this.databaseProvider.query(query, values);
  }

  async updatePassword(email: string, password: string): Promise<void> {
    const query = `
      UPDATE users
      SET password = ?
      WHERE email = ?
    `;
    const values = [password, email];
    await this.databaseProvider.query(query, values);
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT * FROM users
      WHERE email = ?
    `;
    const values = [email];
    const [result] = await this.databaseProvider.query(query, values);
    return result;
  }

  async create(data: CreateUserDTO): Promise<void> {
    const query = `
        INSERT INTO users (
          name, email, password, phone, role, address, birth_date, gender
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const values = [
      data.name,
      data.email,
      data.password,
      data.phone,
      data.role,
      data.address,
      data.birth_date,
      data.gender,
    ];

    await this.databaseProvider.query(query, values);
  }

  async findById(id: number): Promise<User | null> {
    const query = `
      SELECT * FROM users
      WHERE id = ?
    `;
    const values = [id];
    const [result] = await this.databaseProvider.query(query, values);
    return result;
  }

  list(): Promise<User[]> {
    return this.databaseProvider.query(`SELECT * FROM users`);
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const query = `
        UPDATE users
        SET name = ?, email = ?, phone = ?, address = ?, birth_date = ?, gender = ?
        WHERE id = ?
      `;
    const values = [
      data.name,
      data.email,
      data.phone,
      data.address,
      data.birth_date,
      data.gender,
      id,
    ];
    await this.databaseProvider.query(query, values);
    return this.findById(id) as Promise<User>;
  }

  async delete(id: number): Promise<void> {
    const query = `
      UPDATE users
      SET deleted_at = NOW(), is_active = 0
      WHERE id = ?
    `;
    const values = [id];
    await this.databaseProvider.query(query, values);
  }

  async softDelete(id: number): Promise<void> {
    const query = `
      UPDATE users
      SET deleted_at = NOW(), is_active = FALSE
      WHERE id = ?
    `;
    const values = [id];
    await this.databaseProvider.query(query, values);
  }
}
