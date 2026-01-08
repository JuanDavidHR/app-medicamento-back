import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ReminderStatus } from "../../domain/entities/reminder.entity";

export class UpdateReminderStatusDto {
  @ApiProperty({ enum: ReminderStatus })
  @IsEnum(ReminderStatus)
  status: ReminderStatus;
}
