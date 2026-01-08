import { ReminderStatus } from "../../../domain/entities/reminder.entity";

export class UpdateReminderStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: ReminderStatus
  ) {}
}
