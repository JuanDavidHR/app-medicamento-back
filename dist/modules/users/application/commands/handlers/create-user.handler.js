"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("../../../domain/entities/user.entity");
const create_user_command_1 = require("../impl/create-user.command");
const user_repository_interface_1 = require("../../../domain/repositories/user.repository.interface");
let CreateUserHandler = class CreateUserHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        const existingUser = await this.userRepository.findByEmail(command.email);
        if (existingUser) {
            throw new common_1.ConflictException("User already exists");
        }
        const hashedPassword = await bcrypt.hash(command.password, 10);
        const user = new user_entity_1.User();
        Object.assign(user, {
            email: command.email,
            password: hashedPassword,
            role: command.role,
        });
        return this.userRepository.save(user);
    }
};
exports.CreateUserHandler = CreateUserHandler;
exports.CreateUserHandler = CreateUserHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_user_command_1.CreateUserCommand),
    __param(0, (0, common_1.Inject)(user_repository_interface_1.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], CreateUserHandler);
//# sourceMappingURL=create-user.handler.js.map