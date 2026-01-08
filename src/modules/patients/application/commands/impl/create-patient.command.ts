import { ICommand } from '@nestjs/cqrs';
import { IsString, IsOptional } from 'class-validator';

export class CreatePatientCommand implements ICommand {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly condition?: string;

  constructor(name: string, condition?: string) {
    this.name = name;
    this.condition = condition;
  }
}
