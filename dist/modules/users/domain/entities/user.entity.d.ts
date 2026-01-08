import { UserRole } from "../enums/user-role.enum";
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
