import {
  IsString,
  IsUUID,
  IsOptional,
  IsArray,
  IsDateString,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTreatmentPlanDto {
  @ApiProperty({ example: "uuid-of-patient" })
  @IsUUID()
  patientId: string;

  @ApiProperty({ example: "Paracetamol" })
  @IsString()
  medication: string;

  @ApiProperty({ example: "500mg" })
  @IsString()
  dosage: string;

  @ApiProperty({ example: "Every 8 hours" })
  @IsString()
  frequency: string;

  @ApiProperty({ example: ["08:00", "14:00", "20:00"], required: false })
  @IsArray()
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    each: true,
    message: "Each time must be in HH:mm format",
  })
  scheduleTimes?: string[];

  @ApiProperty({ example: "2026-01-15", required: false })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ example: "2026-02-15", required: false })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ example: "Take with food", required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
