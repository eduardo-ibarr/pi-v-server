import { Router } from "express";
import { ProductsFactory } from "../../factories/products-factory";
import { ProductsController } from "../controllers/products-controller";
import authMiddleware from "../../../../app/middlewares/authenticate";
import { JoiProvider } from "../../../../providers/validation/joi-provider";

const router = Router();

const productsController = new ProductsController(
  ProductsFactory,
  new JoiProvider()
);

router.get("/", productsController.list.bind(productsController));
router.post(
  "/",
  authMiddleware,
  productsController.create.bind(productsController)
);
router.put(
  "/:id",
  authMiddleware,
  productsController.update.bind(productsController)
);
router.delete(
  "/:id",
  authMiddleware,
  productsController.delete.bind(productsController)
);
router.get("/:id", productsController.show.bind(productsController));

export default router;
