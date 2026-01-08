import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { GetUserByIdQuery } from "../impl/get-user-by-id.query";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";
import { UserResponse } from "../../../domain/interfaces/user.interfaces";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(query: GetUserByIdQuery): Promise<UserResponse> {
    const user = await this.userRepository.findById(query.id);
    if (!user) {
      throw new CustomHttpException(
        "User not found",
        "ERR_USER_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }
    const { password, ...result } = user;
    return result as UserResponse;
  }
}
