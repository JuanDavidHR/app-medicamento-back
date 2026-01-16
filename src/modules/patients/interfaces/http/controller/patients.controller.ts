import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Query,
  Param,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../../../auth/infrastructure/guards/jwt-auth.guard";
import { RolesGuard } from "../../../../auth/infrastructure/guards/roles.guard";
import { Roles } from "../../../../auth/infrastructure/decorators/roles.decorator";
import { UserRole } from "../../../../users/domain/enums/user-role.enum";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePatientCommand } from "../../../application/commands/impl/create-patient.command";
import { GetDashboardQuery } from "../../../application/queries/impl/get-dashboard.query";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatePatientDto } from "../../../infrastructure/dtos/request/create-patient.dto";
import { UpdatePatientDto } from "../../../infrastructure/dtos/request/update-patient.dto";
import { PatientSearchQueryDto } from "../../../infrastructure/dtos/request/patient-search-query.dto";
import { DashboardResponseDto } from "../../../infrastructure/dtos/response/patient-dashboard.dto";

import { SearchPatientsQuery } from "../../../application/queries/impl/search-patients.query";
import { UpdatePatientCommand } from "../../../application/commands/impl/update-patient.command";

@ApiTags("Patients")
@Controller("patients")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CAREGIVER)
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

  @Get("search")
  @ApiOperation({ summary: "Search patients" })
  async search(@Query() query: PatientSearchQueryDto) {
    return this.queryBus.execute(new SearchPatientsQuery(query));
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a patient" })
  async update(@Param("id") id: string, @Body() dto: UpdatePatientDto) {
    return this.commandBus.execute(new UpdatePatientCommand(id, dto));
  }
}
