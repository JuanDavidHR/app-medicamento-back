import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AssignPatientDto } from "../../infrastructure/dtos/assign-patient.dto";
import { AssignPatientCommand } from "../../application/commands/impl/assign-patient.command";
import { UnassignPatientCommand } from "../../application/commands/impl/unassign-patient.command";
import { GetPatientsByCaregiverQuery } from "../../application/queries/impl/get-patients-by-caregiver.query";
import { JwtAuthGuard } from "../../../auth/infrastructure/guards/jwt-auth.guard";

@ApiTags("caregivers")
@Controller("caregivers")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CaregiversController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post("assign")
  @ApiOperation({ summary: "Assign a patient to a caregiver" })
  @ApiResponse({ status: 201, description: "Patient assigned" })
  async assign(@Body() dto: AssignPatientDto) {
    return this.commandBus.execute(
      new AssignPatientCommand(dto.caregiverId, dto.patientId)
    );
  }

  @Get(":caregiverId/patients")
  @ApiOperation({ summary: "Get all patients of a caregiver" })
  @ApiResponse({ status: 200, description: "List of patients" })
  async getPatients(@Param("caregiverId") caregiverId: string) {
    return this.queryBus.execute(new GetPatientsByCaregiverQuery(caregiverId));
  }

  @Delete(":id")
  @ApiOperation({ summary: "Unassign patient from caregiver" })
  @ApiResponse({ status: 200, description: "Patient unassigned" })
  async unassign(@Param("id") id: string) {
    return this.commandBus.execute(new UnassignPatientCommand(id));
  }
}
