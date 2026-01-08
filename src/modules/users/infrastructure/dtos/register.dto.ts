import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../../domain/enums/user-role.enum";

export class RegisterDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, required: false, default: UserRole.CAREGIVER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
