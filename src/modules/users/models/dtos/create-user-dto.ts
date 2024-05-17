export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  birth_date: Date;
  gender: string;
  role: "admin" | "user";
}
