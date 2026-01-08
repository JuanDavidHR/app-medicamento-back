import { Controller, Post, Body, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePatientCommand } from "../../../application/commands/impl/create-patient.command";
import { GetDashboardQuery } from "../../../application/queries/impl/get-dashboard.query";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatePatientDto } from "../../../infrastructure/dtos/create-patient.dto";
import { DashboardResponseDto } from "../../../infrastructure/dtos/patient-dashboard.dto";

@ApiTags("Patients")
@Controller("patients")
export class PatientsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new patient" })
  @ApiResponse({ status: 201, description: "Patient created successfully" })
  async create(@Body() dto: CreatePatientDto) {
    const command = new CreatePatientCommand(dto.name, dto.condition);
    return this.commandBus.execute(command);
  }

  @Get("dashboard")
  @ApiOperation({ summary: "Get patients dashboard" })
  @ApiResponse({ status: 200, type: DashboardResponseDto })
  async getDashboard(): Promise<DashboardResponseDto> {
    return this.queryBus.execute(new GetDashboardQuery());
  }
}
