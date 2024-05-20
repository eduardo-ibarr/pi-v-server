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
  "/page_views",
  trackingsController.createPageView.bind(trackingsController)
);

router.post(
  "/product_views",
  trackingsController.createProductView.bind(trackingsController)
);

router.get(
  "/",
  authMiddleware,
  trackingsController.listEvents.bind(trackingsController)
);

router.get(
  "/page_views",
  authMiddleware,
  trackingsController.listPageViews.bind(trackingsController)
);

router.get(
  "/product_views",
  authMiddleware,
  trackingsController.listProductViews.bind(trackingsController)
);

router.get(
  "/:id",
  authMiddleware,
  trackingsController.getEventById.bind(trackingsController)
);

router.get(
  "/page_views/:id",
  authMiddleware,
  trackingsController.getPageViewById.bind(trackingsController)
);

router.get(
  "/product_views/:id",
  authMiddleware,
  trackingsController.getProductViewById.bind(trackingsController)
);

export default router;
