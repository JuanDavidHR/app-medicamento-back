import {
  IsUUID,
  IsDateString,
  IsString,
  IsOptional,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReminderDto {
  @ApiProperty({ example: "uuid-of-patient" })
  @IsUUID()
  patientId: string;

  @ApiProperty({ example: "2026-01-15" })
  @IsDateString()
  scheduledAt: Date;

  @ApiProperty({ example: "08:00", description: "Time in HH:mm format" })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Time must be in HH:mm format",
  })
  scheduledTime: string;

  @ApiProperty({ example: "uuid-of-treatment-plan", required: false })
  @IsUUID()
  @IsOptional()
  treatmentPlanId?: string;

  @ApiProperty({ example: "Remember to take your medication", required: false })
  @IsString()
  @IsOptional()
  message?: string;
}
