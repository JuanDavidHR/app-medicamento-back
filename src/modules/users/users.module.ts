import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { User } from "./domain/entities/user.entity";
import { IUserRepository } from "./domain/repositories/user.repository.interface";
import { TypeOrmUserRepository } from "./infrastructure/persistence/typeorm/repositories/typeorm-user.repository";
import { CreateUserHandler } from "./application/commands/handlers/create-user.handler";
import { UsersController } from "./interfaces/http/users.controller";

const CommandHandlers = [CreateUserHandler];

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    {
      provide: IUserRepository,
      useClass: TypeOrmUserRepository,
    },
    ...CommandHandlers,
  ],
  controllers: [UsersController],
  exports: [IUserRepository],
})
export class UsersModule {}
