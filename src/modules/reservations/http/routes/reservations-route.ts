import { Router } from "express";
import { ReservationsFactory } from "../../factories/reservations-factory";
import { ReservationsController } from "../controllers/reservations-controller";
import authMiddleware from "../../../../app/middlewares/authenticate";
import { JoiProvider } from "../../../../providers/validation/joi-provider";

const router = Router();

const reservationsController = new ReservationsController(
  ReservationsFactory,
  new JoiProvider()
);

router.get(
  "/",
  authMiddleware,
  reservationsController.list.bind(reservationsController)
);
router.post(
  "/",
  authMiddleware,
  reservationsController.create.bind(reservationsController)
);
router.put(
  "/:id",
  authMiddleware,
  reservationsController.update.bind(reservationsController)
);
router.delete(
  "/:id",
  authMiddleware,
  reservationsController.delete.bind(reservationsController)
);
router.get(
  "/:id",
  authMiddleware,
  reservationsController.show.bind(reservationsController)
);

export default router;
