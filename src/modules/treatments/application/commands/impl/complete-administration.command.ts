import { ICommand } from "@nestjs/cqrs";
import { IsUUID } from "class-validator";

export class CompleteAdministrationCommand implements ICommand {
  @IsUUID()
  readonly administrationId: string;

  constructor(administrationId: string) {
    this.administrationId = administrationId;
  }
}
