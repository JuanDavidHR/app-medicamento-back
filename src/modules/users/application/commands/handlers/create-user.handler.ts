import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "../../../domain/entities/user.entity";
import { CreateUserCommand } from "../impl/create-user.command";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(command.password, 10);

    const user = new User();
    Object.assign(user, {
      email: command.email,
      password: hashedPassword,
      role: command.role,
    });

    return this.userRepository.save(user);
  }
}
