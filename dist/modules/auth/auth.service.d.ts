import { JwtService } from "@nestjs/jwt";
import { IUserRepository } from "../users/domain/repositories/user.repository.interface";
import { LoginDto } from "./infrastructure/dtos/login.dto";
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: IUserRepository, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import("../users/domain/enums/user-role.enum").UserRole;
        };
    }>;
}
