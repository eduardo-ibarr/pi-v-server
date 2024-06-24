export interface UpdateUserDTO extends Record<"id", number> {
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  gender?: string;
}
