import { MySQLProvider } from "../../../providers/database/mysql-provider";
import { ReservationsRepository } from "../repositories/reservations-repository";
import { CreateReservationService } from "../services/create-reservation";
import { DeleteReservationService } from "../services/delete-reservation";
import { GetReservationByIdService } from "../services/get-reservation-by-id";
import { ListReservationsService } from "../services/list-reservations";
import { UpdateReservationService } from "../services/update-reservation";

export class ReservationsFactory {
  static makeGetReservationByIdService() {
    return new GetReservationByIdService(
      new ReservationsRepository(new MySQLProvider())
    );
  }

  static makeCreateReservationService() {
    return new CreateReservationService(
      new ReservationsRepository(new MySQLProvider())
    );
  }

  static makeUpdateReservationService() {
    return new UpdateReservationService(
      new ReservationsRepository(new MySQLProvider())
    );
  }

  static makeDeleteReservationService() {
    return new DeleteReservationService(
      new ReservationsRepository(new MySQLProvider())
    );
  }

  static makeListReservationsService() {
    return new ListReservationsService(
      new ReservationsRepository(new MySQLProvider())
    );
  }
}
