import { IsEmail, IsString, IsEnum, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../../domain/enums/user-role.enum";

export class UpdateUserDto {
  @ApiProperty({ example: "user@example.com", required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: UserRole, required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
