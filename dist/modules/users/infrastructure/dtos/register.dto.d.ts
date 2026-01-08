import { UserRole } from "../../domain/enums/user-role.enum";
export declare class RegisterDto {
    email: string;
    password: string;
    role?: UserRole;
}
