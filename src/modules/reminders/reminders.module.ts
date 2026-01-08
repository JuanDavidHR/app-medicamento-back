import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { Reminder } from "./domain/entities/reminder.entity";
import { IReminderRepository } from "./domain/repositories/reminder.repository.interface";
import { TypeOrmReminderRepository } from "./infrastructure/persistence/typeorm/repositories/typeorm-reminder.repository";
import { CreateReminderHandler } from "./application/commands/handlers/create-reminder.handler";
import { UpdateReminderStatusHandler } from "./application/commands/handlers/update-reminder-status.handler";
import { GetRemindersByPatientHandler } from "./application/queries/handlers/get-reminders-by-patient.handler";
import { GetPendingRemindersHandler } from "./application/queries/handlers/get-pending-reminders.handler";
import { RemindersController } from "./interfaces/http/reminders.controller";

const CommandHandlers = [CreateReminderHandler, UpdateReminderStatusHandler];
const QueryHandlers = [
  GetRemindersByPatientHandler,
  GetPendingRemindersHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([Reminder]), CqrsModule],
  providers: [
    {
      provide: IReminderRepository,
      useClass: TypeOrmReminderRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  controllers: [RemindersController],
  exports: [IReminderRepository],
})
export class RemindersModule {}
