import { UserRole } from "../../../domain/enums/user-role.enum";
export declare class CreateUserCommand {
    readonly email: string;
    readonly password: string;
    readonly role: UserRole;
    constructor(email: string, password: string, role?: UserRole);
}
