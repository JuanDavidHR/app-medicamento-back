import { IsString, IsOptional, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientDto {
  @ApiProperty({ example: "John Doe", description: "The name of the patient" })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({
    example: "Hypertension",
    description: "Medical condition",
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly condition?: string;
}
