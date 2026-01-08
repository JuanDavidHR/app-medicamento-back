import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { User } from "./domain/entities/user.entity";
import { IUserRepository } from "./domain/repositories/user.repository.interface";
import { TypeOrmUserRepository } from "./infrastructure/persistence/typeorm/repositories/typeorm-user.repository";
import { CreateUserHandler } from "./application/commands/handlers/create-user.handler";
import { UpdateUserHandler } from "./application/commands/handlers/update-user.handler";
import { DeleteUserHandler } from "./application/commands/handlers/delete-user.handler";
import { GetUserByIdHandler } from "./application/queries/handlers/get-user-by-id.handler";
import { GetAllUsersHandler } from "./application/queries/handlers/get-all-users.handler";
import { UsersController } from "./interfaces/http/users.controller";

const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
const QueryHandlers = [GetUserByIdHandler, GetAllUsersHandler];

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    {
      provide: IUserRepository,
      useClass: TypeOrmUserRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  controllers: [UsersController],
  exports: [IUserRepository],
})
export class UsersModule {}
