import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetRemindersByPatientAndDateQuery } from "../impl/get-reminders-by-patient-and-date.query";
import { IReminderRepository } from "../../../domain/repositories/reminder.repository.interface";

@QueryHandler(GetRemindersByPatientAndDateQuery)
export class GetRemindersByPatientAndDateHandler implements IQueryHandler<GetRemindersByPatientAndDateQuery> {
  constructor(
    @Inject(IReminderRepository)
    private readonly reminderRepository: IReminderRepository,
  ) {}

  async execute(query: GetRemindersByPatientAndDateQuery) {
    const date = new Date(query.date);
    return this.reminderRepository.findByPatientAndDate(query.patientId, date);
  }
}
