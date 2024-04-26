export interface UpdateUserDTO extends Record<"id", number> {
  name?: string;
  email?: string;
  phone?: string;
}
