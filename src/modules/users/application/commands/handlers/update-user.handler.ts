import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { UpdateUserCommand } from "../impl/update-user.command";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";
import { UserResponse } from "../../../domain/interfaces/user.interfaces";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserResponse> {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new CustomHttpException(
        "User not found",
        "ERR_USER_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }

    if (command.email) {
      user.email = command.email;
    }
    if (command.role) {
      user.role = command.role;
    }

    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return result as UserResponse;
  }
}
