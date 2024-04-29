import { User } from "../user";
export interface UserReturnedDTO
  extends Omit<
    User,
    "password, password_reset_token, password_reset_token_expiry"
  > {}
