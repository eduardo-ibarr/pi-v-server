export interface UpdateUserDTO extends Record<"id", number> {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  birth_date?: Date;
  gender?: string;
}
