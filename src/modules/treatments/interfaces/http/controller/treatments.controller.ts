import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CompleteAdministrationCommand } from "../../../application/commands/impl/complete-administration.command";
import { CreateTreatmentPlanCommand } from "../../../application/commands/impl/create-treatment-plan.command";
import { UpdateTreatmentPlanCommand } from "../../../application/commands/impl/update-treatment-plan.command";
import { DeleteTreatmentPlanCommand } from "../../../application/commands/impl/delete-treatment-plan.command";
import { GetTreatmentPlanByIdQuery } from "../../../application/queries/impl/get-treatment-plan-by-id.query";
import { GetTreatmentPlansByPatientQuery } from "../../../application/queries/impl/get-treatment-plans-by-patient.query";
import { GetAllTreatmentPlansQuery } from "../../../application/queries/impl/get-all-treatment-plans.query";
import { CreateTreatmentPlanDto } from "../../../infrastructure/dtos/create-treatment-plan.dto";
import { UpdateTreatmentPlanDto } from "../../../infrastructure/dtos/update-treatment-plan.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../../auth/infrastructure/guards/jwt-auth.guard";

@ApiTags("Treatments")
@Controller("treatments")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TreatmentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  // Treatment Plans CRUD
  @Post("plans")
  @ApiOperation({ summary: "Create a treatment plan (receta)" })
  @ApiResponse({ status: 201, description: "Treatment plan created" })
  async createPlan(@Body() dto: CreateTreatmentPlanDto) {
    return this.commandBus.execute(
      new CreateTreatmentPlanCommand(
        dto.patientId,
        dto.medication,
        dto.dosage,
        dto.frequency,
        dto.scheduleTimes,
        dto.startDate,
        dto.endDate,
        dto.notes
      )
    );
  }

  @Get("plans")
  @ApiOperation({ summary: "Get all treatment plans" })
  @ApiResponse({ status: 200, description: "List of treatment plans" })
  async getAllPlans() {
    return this.queryBus.execute(new GetAllTreatmentPlansQuery());
  }

  @Get("plans/:id")
  @ApiOperation({ summary: "Get treatment plan by ID" })
  @ApiResponse({ status: 200, description: "Treatment plan found" })
  async getPlanById(@Param("id") id: string) {
    return this.queryBus.execute(new GetTreatmentPlanByIdQuery(id));
  }

  @Get("plans/patient/:patientId")
  @ApiOperation({ summary: "Get treatment plans by patient" })
  @ApiResponse({
    status: 200,
    description: "List of treatment plans for patient",
  })
  async getPlansByPatient(@Param("patientId") patientId: string) {
    return this.queryBus.execute(
      new GetTreatmentPlansByPatientQuery(patientId)
    );
  }

  @Put("plans/:id")
  @ApiOperation({ summary: "Update a treatment plan" })
  @ApiResponse({ status: 200, description: "Treatment plan updated" })
  async updatePlan(
    @Param("id") id: string,
    @Body() dto: UpdateTreatmentPlanDto
  ) {
    return this.commandBus.execute(
      new UpdateTreatmentPlanCommand(
        id,
        dto.medication,
        dto.dosage,
        dto.frequency,
        dto.scheduleTimes,
        dto.startDate,
        dto.endDate,
        dto.notes
      )
    );
  }

  @Delete("plans/:id")
  @ApiOperation({ summary: "Delete a treatment plan" })
  @ApiResponse({ status: 200, description: "Treatment plan deleted" })
  async deletePlan(@Param("id") id: string) {
    return this.commandBus.execute(new DeleteTreatmentPlanCommand(id));
  }

  // Medication Administration
  @Post("administration/:id/complete")
  @ApiOperation({ summary: "Complete a medication administration" })
  async complete(@Param("id") id: string) {
    return this.commandBus.execute(new CompleteAdministrationCommand(id));
  }
}
