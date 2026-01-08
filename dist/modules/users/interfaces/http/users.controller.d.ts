import { CommandBus } from "@nestjs/cqrs";
import { RegisterDto } from "../../infrastructure/dtos/register.dto";
export declare class UsersController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    register(registerDto: RegisterDto): Promise<any>;
}
