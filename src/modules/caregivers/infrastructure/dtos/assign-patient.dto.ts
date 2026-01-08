import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AssignPatientDto {
  @ApiProperty({ example: "uuid-of-caregiver" })
  @IsUUID()
  caregiverId: string;

  @ApiProperty({ example: "uuid-of-patient" })
  @IsUUID()
  patientId: string;
}
