export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  phone: string;
  password_reset_token: string;
  password_reset_token_expiry: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  is_active: boolean;
  gender: string;
  role: "admin" | "user";
}
