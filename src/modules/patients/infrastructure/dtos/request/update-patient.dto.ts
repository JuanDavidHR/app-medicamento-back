import { IsString, IsOptional, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePatientDto {
  @ApiProperty({
    example: "John Doe Updated",
    description: "The name of the patient",
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  readonly name?: string;

  @ApiProperty({
    example: "Improved Hypertension",
    description: "Medical condition",
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly condition?: string;
}
