import { ICommandHandler } from "@nestjs/cqrs";
import { User } from "../../../domain/entities/user.entity";
import { CreateUserCommand } from "../impl/create-user.command";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";
export declare class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(command: CreateUserCommand): Promise<User>;
}
