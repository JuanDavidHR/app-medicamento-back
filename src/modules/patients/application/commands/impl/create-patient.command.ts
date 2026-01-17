import { ICommand } from "@nestjs/cqrs";
import { IsString, IsOptional } from "class-validator";

export class CreatePatientCommand implements ICommand {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly condition?: string;

  readonly creatorId: string;
  readonly creatorRole: string;

  constructor(
    name: string,
    condition: string,
    creatorId: string,
    creatorRole: string,
  ) {
    this.name = name;
    this.condition = condition;
    this.creatorId = creatorId;
    this.creatorRole = creatorRole;
  }
}
