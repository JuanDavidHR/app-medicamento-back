import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMedicationDto {
  @ApiProperty({ example: "Paracetamol", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: "Analgesic and antipyretic", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: "tablet", required: false })
  @IsString()
  @IsOptional()
  dosage_form?: string;

  @ApiProperty({ example: "500mg", required: false })
  @IsString()
  @IsOptional()
  strength?: string;

  @ApiProperty({ example: "Generic Pharma", required: false })
  @IsString()
  @IsOptional()
  manufacturer?: string;
}
