import { Category } from "../models/category";
import { ICategoriesRepository } from "../models/categories-repository";

export class ListCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}
