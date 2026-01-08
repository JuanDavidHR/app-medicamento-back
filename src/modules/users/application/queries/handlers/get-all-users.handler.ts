import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllUsersQuery } from "../impl/get-all-users.query";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute() {
    const users = await this.userRepository.findAll();
    return users.map(({ password, ...user }) => user);
  }
}
