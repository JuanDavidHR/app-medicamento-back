import { UserRole } from "../../../domain/enums/user-role.enum";

export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole = UserRole.CAREGIVER
  ) {}
}
