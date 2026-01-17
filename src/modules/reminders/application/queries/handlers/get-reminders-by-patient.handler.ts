import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetRemindersByPatientQuery } from "../impl/get-reminders-by-patient.query";
import { IReminderRepository } from "../../../domain/repositories/reminder.repository.interface";

@QueryHandler(GetRemindersByPatientQuery)
export class GetRemindersByPatientHandler implements IQueryHandler<GetRemindersByPatientQuery> {
  constructor(
    @Inject(IReminderRepository)
    private readonly reminderRepository: IReminderRepository,
  ) {}

  async execute(query: GetRemindersByPatientQuery) {
    if (query.date) {
      const date = new Date(query.date);
      return this.reminderRepository.findByPatientAndDate(
        query.patientId,
        date,
      );
    }
    return this.reminderRepository.findByPatient(query.patientId);
  }
}
