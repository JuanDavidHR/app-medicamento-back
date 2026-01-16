import { IQuery } from "@nestjs/cqrs";

export class GetDashboardQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly role: string,
  ) {}
}
