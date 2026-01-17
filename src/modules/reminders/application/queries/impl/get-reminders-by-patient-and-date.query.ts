import { IQuery } from "@nestjs/cqrs";

export class GetRemindersByPatientAndDateQuery implements IQuery {
  constructor(
    public readonly patientId: string,
    public readonly date: string,
  ) {}
}
