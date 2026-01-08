import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { UpdateReminderStatusCommand } from "../impl/update-reminder-status.command";
import { IReminderRepository } from "../../../domain/repositories/reminder.repository.interface";
import {
  Reminder,
  ReminderStatus,
} from "../../../domain/entities/reminder.entity";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

@CommandHandler(UpdateReminderStatusCommand)
export class UpdateReminderStatusHandler implements ICommandHandler<UpdateReminderStatusCommand> {
  constructor(
    @Inject(IReminderRepository)
    private readonly reminderRepository: IReminderRepository
  ) {}

  async execute(command: UpdateReminderStatusCommand): Promise<Reminder> {
    const reminder = await this.reminderRepository.findById(command.id);
    if (!reminder) {
      throw new CustomHttpException(
        "Reminder not found",
        "ERR_REMINDER_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }

    reminder.status = command.status;

    if (command.status === ReminderStatus.SENT) {
      reminder.sent_at = new Date();
    } else if (command.status === ReminderStatus.ACKNOWLEDGED) {
      reminder.acknowledged_at = new Date();
    }

    return this.reminderRepository.save(reminder);
  }
}
