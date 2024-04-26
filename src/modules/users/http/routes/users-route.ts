import { Router } from "express";
import { UsersFactory } from "../../factories/users-factory";
import { UsersController } from "../controllers/users-controller";

const router = Router();

const usersFactory = new UsersFactory();
const usersController = new UsersController(usersFactory);

router.get("/", usersController.list.bind(usersController));
router.post("/", usersController.create.bind(usersController));
router.put("/:id", usersController.update.bind(usersController));
router.delete("/:id", usersController.delete.bind(usersController));
router.get("/:id", usersController.show.bind(usersController));
router.post("/login", usersController.authenticate.bind(usersController));
router.post(
  "/reset-password",
  usersController.resetPassword.bind(usersController)
);

export default router;
