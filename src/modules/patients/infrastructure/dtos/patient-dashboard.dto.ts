import { ApiProperty } from "@nestjs/swagger";

export class PatientSummaryDto {
  @ApiProperty()
  readonly completedCount: number;

  @ApiProperty({ type: "array", items: { type: "object" } })
  readonly history: any[];
}

export class PatientDashboardDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ required: false })
  readonly condition?: string;

  @ApiProperty({ type: PatientSummaryDto, required: false })
  readonly summary?: PatientSummaryDto;
}

export class DashboardResponseDto {
  @ApiProperty()
  readonly totalPatients: number;

  @ApiProperty({ type: [PatientDashboardDto] })
  readonly patients: PatientDashboardDto[];
}
