import { Request, Response } from "express";
import { TrackingsFactory } from "../../factories/trackings-factory";
import { IValidationProvider } from "../../../../providers/validation/models/validation-provider";
import { createEventSchema } from "../../models/schemas/create-event-schema";
import { createPageViewSchema } from "../../models/schemas/create-page-view-schema";
import { createProductViewSchema } from "../../models/schemas/create-product-view-schema";
import { paramsSchema } from "../../models/schemas/params-schema";

export class TrackingsController {
  constructor(
    private trackingsFactory: typeof TrackingsFactory,
    private readonly validationProvider: IValidationProvider
  ) {}

  async createEvent(request: Request, response: Response) {
    await this.validationProvider.validate(request.body, createEventSchema);
    const createEventService = this.trackingsFactory.makeCreateEventService();
    const event = await createEventService.execute(request.body);
    return response.status(201).json(event);
  }

  async createPageView(request: Request, response: Response) {
    await this.validationProvider.validate(request.body, createPageViewSchema);
    const createPageViewService =
      this.trackingsFactory.makeCreatePageViewService();
    const pageView = await createPageViewService.execute(request.body);
    return response.status(201).json(pageView);
  }

  async createProductView(request: Request, response: Response) {
    await this.validationProvider.validate(
      request.body,
      createProductViewSchema
    );
    const createProductViewService =
      this.trackingsFactory.makeCreateProductViewService();
    const productView = await createProductViewService.execute(request.body);
    return response.status(201).json(productView);
  }

  async getEventById(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);
    const { id } = request.params;
    const getEventByIdService = this.trackingsFactory.makeGetEventByIdService();
    const event = await getEventByIdService.execute(Number(id));
    if (!event) {
      return response.status(404).json({ error: "Evento não encontrado." });
    }
    return response.json(event);
  }

  async getPageViewById(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);
    const { id } = request.params;
    const getPageViewByIdService =
      this.trackingsFactory.makeGetPageViewByIdService();
    const pageView = await getPageViewByIdService.execute(Number(id));
    if (!pageView) {
      return response
        .status(404)
        .json({ error: "Visualização de página não encontrada." });
    }
    return response.json(pageView);
  }

  async getProductViewById(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);
    const { id } = request.params;
    const getProductViewByIdService =
      this.trackingsFactory.makeGetProductViewByIdService();
    const productView = await getProductViewByIdService.execute(Number(id));
    if (!productView) {
      return response
        .status(404)
        .json({ error: "Visualização de produto não encontrada." });
    }
    return response.json(productView);
  }

  async listEvents(request: Request, response: Response) {
    const listEventsService = this.trackingsFactory.makeListEventsService();
    const events = await listEventsService.execute();
    return response.json(events);
  }

  async listPageViews(request: Request, response: Response) {
    const listPageViewsService =
      this.trackingsFactory.makeListPageViewsService();
    const pageViews = await listPageViewsService.execute();
    return response.json(pageViews);
  }

  async listProductViews(request: Request, response: Response) {
    const listProductViewsService =
      this.trackingsFactory.makeListProductViewsService();
    const productViews = await listProductViewsService.execute();
    return response.json(productViews);
  }
}
