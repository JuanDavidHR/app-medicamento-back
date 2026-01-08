import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetPendingRemindersQuery } from "../impl/get-pending-reminders.query";
import { IReminderRepository } from "../../../domain/repositories/reminder.repository.interface";

@QueryHandler(GetPendingRemindersQuery)
export class GetPendingRemindersHandler implements IQueryHandler<GetPendingRemindersQuery> {
  constructor(
    @Inject(IReminderRepository)
    private readonly reminderRepository: IReminderRepository
  ) {}

  async execute(query: GetPendingRemindersQuery) {
    const date = query.date || new Date();
    return this.reminderRepository.findPendingByDate(date);
  }
}
