import { Router } from "express";
import { TrackingsFactory } from "../../factories/trackings-factory";
import { TrackingsController } from "../controllers/trackings-controller";
import authMiddleware from "../../../../app/middlewares/authenticate";
import { JoiProvider } from "../../../../providers/validation/joi-provider";

const router = Router();

const trackingsController = new TrackingsController(
  TrackingsFactory,
  new JoiProvider()
);

router.post(
  "/",
  authMiddleware,
  trackingsController.createEvent.bind(trackingsController)
);
router.post(
  "/page_views",
  authMiddleware,
  trackingsController.createPageView.bind(trackingsController)
);
router.post(
  "/product_views",
  authMiddleware,
  trackingsController.createProductView.bind(trackingsController)
);
router.get("/:id", trackingsController.getEventById.bind(trackingsController));
router.get(
  "/page_views/:id",
  trackingsController.getPageViewById.bind(trackingsController)
);
router.get(
  "/product_views/:id",
  trackingsController.getProductViewById.bind(trackingsController)
);
router.get("/", trackingsController.listEvents.bind(trackingsController));
router.get(
  "/page_views",
  trackingsController.listPageViews.bind(trackingsController)
);
router.get(
  "/product_views",
  trackingsController.listProductViews.bind(trackingsController)
);

export default router;
