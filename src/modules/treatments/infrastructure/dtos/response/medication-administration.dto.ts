import { ApiProperty } from "@nestjs/swagger";
import { AdministrationStatus } from "../../../domain/entities/medication-administration.entity";

export class MedicationAdministrationDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly treatmentPlanId: string;

  @ApiProperty()
  readonly patientId: string;

  @ApiProperty({ enum: AdministrationStatus })
  readonly status: AdministrationStatus;

  @ApiProperty()
  readonly scheduledAt: Date;

  @ApiProperty({ required: false })
  readonly completedAt?: Date;

  @ApiProperty()
  readonly version: number;
}
