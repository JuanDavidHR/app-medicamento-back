import { Controller, Post, Param } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CompleteAdministrationCommand } from "../../../application/commands/impl/complete-administration.command";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Treatments")
@Controller("treatments")
export class TreatmentsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("administration/:id/complete")
  @ApiOperation({ summary: "Complete a medication administration" })
  async complete(@Param("id") id: string) {
    return this.commandBus.execute(new CompleteAdministrationCommand(id));
  }
}
