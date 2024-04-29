import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { AuthFactory } from "../../factories/auth-factory";
import { JoiProvider } from "../../../../providers/validation/joi-provider";

const router = Router();

const authController = new AuthController(AuthFactory, new JoiProvider());

router.post("/login", authController.login.bind(authController));
router.post("/logout", authController.logout.bind(authController));

export default router;
