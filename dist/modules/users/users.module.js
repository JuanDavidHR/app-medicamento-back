"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const user_entity_1 = require("./domain/entities/user.entity");
const user_repository_interface_1 = require("./domain/repositories/user.repository.interface");
const typeorm_user_repository_1 = require("./infrastructure/persistence/typeorm/repositories/typeorm-user.repository");
const create_user_handler_1 = require("./application/commands/handlers/create-user.handler");
const users_controller_1 = require("./interfaces/http/users.controller");
const CommandHandlers = [create_user_handler_1.CreateUserHandler];
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), cqrs_1.CqrsModule],
        providers: [
            {
                provide: user_repository_interface_1.IUserRepository,
                useClass: typeorm_user_repository_1.TypeOrmUserRepository,
            },
            ...CommandHandlers,
        ],
        controllers: [users_controller_1.UsersController],
        exports: [user_repository_interface_1.IUserRepository],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map