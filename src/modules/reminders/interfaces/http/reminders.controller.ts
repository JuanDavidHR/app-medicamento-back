import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateReminderDto } from "../../infrastructure/dtos/create-reminder.dto";
import { UpdateReminderStatusDto } from "../../infrastructure/dtos/update-reminder-status.dto";
import { CreateReminderCommand } from "../../application/commands/impl/create-reminder.command";
import { UpdateReminderStatusCommand } from "../../application/commands/impl/update-reminder-status.command";
import { GetRemindersByPatientQuery } from "../../application/queries/impl/get-reminders-by-patient.query";
import { GetPendingRemindersQuery } from "../../application/queries/impl/get-pending-reminders.query";
import { JwtAuthGuard } from "../../../auth/infrastructure/guards/jwt-auth.guard";

@ApiTags("reminders")
@Controller("reminders")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RemindersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a reminder" })
  @ApiResponse({ status: 201, description: "Reminder created" })
  async create(@Body() dto: CreateReminderDto) {
    return this.commandBus.execute(
      new CreateReminderCommand(
        dto.patientId,
        dto.scheduledAt,
        dto.scheduledTime,
        dto.treatmentPlanId,
        dto.message
      )
    );
  }

  @Get("pending")
  @ApiOperation({ summary: "Get all pending reminders for today" })
  @ApiResponse({ status: 200, description: "List of pending reminders" })
  async getPending() {
    return this.queryBus.execute(new GetPendingRemindersQuery());
  }

  @Get("patient/:patientId")
  @ApiOperation({ summary: "Get all reminders for a patient" })
  @ApiResponse({ status: 200, description: "List of reminders" })
  async getByPatient(@Param("patientId") patientId: string) {
    return this.queryBus.execute(new GetRemindersByPatientQuery(patientId));
  }

  @Patch(":id/status")
  @ApiOperation({
    summary: "Update reminder status (acknowledge, mark as sent, etc.)",
  })
  @ApiResponse({ status: 200, description: "Reminder status updated" })
  async updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdateReminderStatusDto
  ) {
    return this.commandBus.execute(
      new UpdateReminderStatusCommand(id, dto.status)
    );
  }
}
