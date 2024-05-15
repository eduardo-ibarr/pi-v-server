import { CreateCategoryDTO } from "./dtos/create-category-dto";
import { UpdateCategoryDTO } from "./dtos/update-category-dto";
import { Category } from "./category";

export interface ICategoriesRepository {
  create(data: CreateCategoryDTO): Promise<void>;
  findById(id: number): Promise<Category | null>;
  list(): Promise<Category[]>;
  update(id: number, data: UpdateCategoryDTO): Promise<Category>;
  delete(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;
}
