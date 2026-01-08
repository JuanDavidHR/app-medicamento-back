import { UserRole } from "../../../domain/enums/user-role.enum";

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly email?: string,
    public readonly role?: UserRole
  ) {}
}
