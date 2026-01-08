import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { DeleteUserCommand } from "../impl/delete-user.command";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";
import { DeleteResponse } from "../../../domain/interfaces/user.interfaces";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: DeleteUserCommand): Promise<DeleteResponse> {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new CustomHttpException(
        "User not found",
        "ERR_USER_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }

    await this.userRepository.delete(command.id);
    return { deleted: true, id: command.id };
  }
}
