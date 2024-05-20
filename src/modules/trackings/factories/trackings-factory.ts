import { MySQLProvider } from "../../../providers/database/mysql-provider";
import { TrackingsRepository } from "../repositories/trackings-repository";

import { CreatePageViewService } from "../services/create/create-page-view";
import { CreateProductViewService } from "../services/create/create-product-view";

import { GetEventByIdService } from "../services/get/get-event-by-id";
import { GetPageViewByIdService } from "../services/get/get-page-view-by-id";
import { GetProductViewByIdService } from "../services/get/get-product-view-by-id";

import { ListEventsService } from "../services/list/list-events";
import { ListPageViewsService } from "../services/list/list-page-views";
import { ListProductViewsService } from "../services/list/list-product-views";

export class TrackingsFactory {
  static makeCreatePageViewService() {
    return new CreatePageViewService(
      new TrackingsRepository(new MySQLProvider())
    );
  }

  static makeCreateProductViewService() {
    return new CreateProductViewService(
      new TrackingsRepository(new MySQLProvider())
    );
  }

  static makeGetEventByIdService() {
    return new GetEventByIdService(
      new TrackingsRepository(new MySQLProvider())
    );
  }

  static makeGetPageViewByIdService() {
    return new GetPageViewByIdService(
      new TrackingsRepository(new MySQLProvider())
    );
  }

  static makeGetProductViewByIdService() {
    return new GetProductViewByIdService(
      new TrackingsRepository(new MySQLProvider())
    );
  }

  static makeListEventsService() {
    return new ListEventsService(new TrackingsRepository(new MySQLProvider()));
  }

  static makeListPageViewsService() {
    return new ListPageViewsService(
      new TrackingsRepository(new MySQLProvider())
    );
  }

  static makeListProductViewsService() {
    return new ListProductViewsService(
      new TrackingsRepository(new MySQLProvider())
    );
  }
}
