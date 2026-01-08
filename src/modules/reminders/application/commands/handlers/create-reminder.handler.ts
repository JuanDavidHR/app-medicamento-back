import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateReminderCommand } from "../impl/create-reminder.command";
import { Reminder } from "../../../domain/entities/reminder.entity";
import { IReminderRepository } from "../../../domain/repositories/reminder.repository.interface";

@CommandHandler(CreateReminderCommand)
export class CreateReminderHandler implements ICommandHandler<CreateReminderCommand> {
  constructor(
    @Inject(IReminderRepository)
    private readonly reminderRepository: IReminderRepository
  ) {}

  async execute(command: CreateReminderCommand): Promise<Reminder> {
    const reminder = new Reminder();
    reminder.patient_id = command.patientId;
    reminder.scheduled_at = command.scheduledAt;
    reminder.scheduled_time = command.scheduledTime;
    reminder.treatment_plan_id = command.treatmentPlanId;
    reminder.message = command.message;

    return this.reminderRepository.save(reminder);
  }
}
