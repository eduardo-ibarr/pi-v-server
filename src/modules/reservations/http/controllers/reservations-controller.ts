import { Request, Response } from "express";
import { ReservationsFactory } from "../../factories/reservations-factory";
import { IValidationProvider } from "../../../../providers/validation/models/validation-provider";
import { createReservationSchema } from "../../models/schemas/create-reservations-schema";
import { updateReservationSchema } from "../../models/schemas/update-reservations-schema";
import { paramsSchema } from "../../models/schemas/params-schema";
import { queryListReservationsSchema } from "../../models/schemas/query-list-reservations-schema";

export class ReservationsController {
  constructor(
    private reservationsFactory: typeof ReservationsFactory,
    private readonly validationProvider: IValidationProvider
  ) {}

  async list(request: Request, response: Response) {
    await this.validationProvider.validate(
      request.query,
      queryListReservationsSchema
    );

    const listReservationsService =
      this.reservationsFactory.makeListReservationsService();
    const reservations = await listReservationsService.execute(request.query);

    return response.json(reservations);
  }

  async create(request: Request, response: Response) {
    await this.validationProvider.validate(
      request.body,
      createReservationSchema
    );

    const createReservationService =
      this.reservationsFactory.makeCreateReservationService();
    const reservation = await createReservationService.execute(request.body);

    return response.status(201).json(reservation);
  }

  async update(request: Request, response: Response) {
    await this.validationProvider.validate(
      request.body,
      updateReservationSchema
    );
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const updateReservationService =
      this.reservationsFactory.makeUpdateReservationService();

    await updateReservationService.execute({
      id: Number(id),
      ...request.body,
    });

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const deleteReservationService =
      this.reservationsFactory.makeDeleteReservationService();

    await deleteReservationService.execute(Number(id));

    return response.status(204).send();
  }

  async show(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const getreservationByIdService =
      this.reservationsFactory.makeGetReservationByIdService();
    const reservation = await getreservationByIdService.execute(Number(id));

    return response.json(reservation);
  }
}
