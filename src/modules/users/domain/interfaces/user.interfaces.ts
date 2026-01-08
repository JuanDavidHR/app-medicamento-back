import { UserRole } from "../enums/user-role.enum";

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface DeleteResponse {
  deleted: boolean;
  id: string;
}
