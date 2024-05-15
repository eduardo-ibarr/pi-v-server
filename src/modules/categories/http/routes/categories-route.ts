import { Router } from "express";
import { CategoriesFactory } from "../../factories/categories-factory";
import { CategoriesController } from "../controllers/categories-controller";
import authMiddleware from "../../../../app/middlewares/authenticate";
import { JoiProvider } from "../../../../providers/validation/joi-provider";

const router = Router();

const categoriesController = new CategoriesController(
  CategoriesFactory,
  new JoiProvider()
);

router.get(
  "/",
  authMiddleware,
  categoriesController.list.bind(categoriesController)
);
router.post(
  "/",
  authMiddleware,
  categoriesController.create.bind(categoriesController)
);
router.put(
  "/:id",
  authMiddleware,
  categoriesController.update.bind(categoriesController)
);
router.delete(
  "/:id",
  authMiddleware,
  categoriesController.delete.bind(categoriesController)
);
router.get(
  "/:id",
  authMiddleware,
  categoriesController.show.bind(categoriesController)
);

export default router;
