import { Router } from "express";
import { UsersFactory } from "../../factories/users-factory";
import { UsersController } from "../controllers/users-controller";
import authMiddleware from "../../../../app/middlewares/authenticate";
import { JoiProvider } from "../../../../providers/validation/joi-provider";

const router = Router();

const usersController = new UsersController(UsersFactory, new JoiProvider());

router.get("/", authMiddleware, usersController.list.bind(usersController));
router.post("/", authMiddleware, usersController.create.bind(usersController));
router.put(
  "/:id",
  authMiddleware,
  usersController.update.bind(usersController)
);
router.delete(
  "/:id",
  authMiddleware,
  usersController.delete.bind(usersController)
);
router.get("/:id", authMiddleware, usersController.show.bind(usersController));
router.post(
  "/reset-password",
  authMiddleware,
  usersController.resetPassword.bind(usersController)
);

export default router;
