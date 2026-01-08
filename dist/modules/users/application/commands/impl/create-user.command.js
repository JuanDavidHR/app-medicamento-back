"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserCommand = void 0;
const user_role_enum_1 = require("../../../domain/enums/user-role.enum");
class CreateUserCommand {
    constructor(email, password, role = user_role_enum_1.UserRole.CAREGIVER) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
exports.CreateUserCommand = CreateUserCommand;
//# sourceMappingURL=create-user.command.js.map