import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PatientSearchQueryDto {
  @ApiProperty({
    description: "Search patients by name",
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description: "Search patients by medical condition",
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly condition?: string;
}
