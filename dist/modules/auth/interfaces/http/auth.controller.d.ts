import { AuthService } from "../../auth.service";
import { LoginDto } from "../../infrastructure/dtos/login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import("../../../users/domain/enums/user-role.enum").UserRole;
        };
    }>;
}
