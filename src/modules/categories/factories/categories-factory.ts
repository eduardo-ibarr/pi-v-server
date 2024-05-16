import { MySQLProvider } from "../../../providers/database/mysql-provider";
import { CategoriesRepository } from "../repositories/categories-repository";
import { CreateCategoryService } from "../services/create-category";
import { DeleteCategoryService } from "../services/delete-category";
import { GetCategoryByIdService } from "../services/get-category-by-id";
import { ListCategoriesService } from "../services/list-categories";
import { UpdateCategoryService } from "../services/update-category";

export class CategoriesFactory {
  static makeGetCategoryByIdService() {
    return new GetCategoryByIdService(
      new CategoriesRepository(new MySQLProvider())
    );
  }

  static makeCreateCategoryService() {
    return new CreateCategoryService(
      new CategoriesRepository(new MySQLProvider())
    );
  }

  static makeUpdateCategoryService() {
    return new UpdateCategoryService(
      new CategoriesRepository(new MySQLProvider())
    );
  }

  static makeDeleteCategoryService() {
    return new DeleteCategoryService(
      new CategoriesRepository(new MySQLProvider())
    );
  }

  static makeListCategoriesService() {
    return new ListCategoriesService(
      new CategoriesRepository(new MySQLProvider())
    );
  }
}
