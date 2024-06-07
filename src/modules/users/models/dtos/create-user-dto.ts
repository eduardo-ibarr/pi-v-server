export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  role: "admin" | "user";
}
