import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
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
import { CreateMedicationDto } from "../../infrastructure/dtos/create-medication.dto";
import { UpdateMedicationDto } from "../../infrastructure/dtos/update-medication.dto";
import { CreateMedicationCommand } from "../../application/commands/impl/create-medication.command";
import { UpdateMedicationCommand } from "../../application/commands/impl/update-medication.command";
import { DeleteMedicationCommand } from "../../application/commands/impl/delete-medication.command";
import { GetMedicationByIdQuery } from "../../application/queries/impl/get-medication-by-id.query";
import { GetAllMedicationsQuery } from "../../application/queries/impl/get-all-medications.query";
import { JwtAuthGuard } from "../../../auth/infrastructure/guards/jwt-auth.guard";

@ApiTags("medications")
@Controller("medications")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MedicationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new medication" })
  @ApiResponse({ status: 201, description: "Medication created" })
  async create(@Body() dto: CreateMedicationDto) {
    return this.commandBus.execute(
      new CreateMedicationCommand(
        dto.name,
        dto.description,
        dto.dosage_form,
        dto.strength,
        dto.manufacturer
      )
    );
  }

  @Get()
  @ApiOperation({ summary: "Get all medications" })
  @ApiResponse({ status: 200, description: "List of medications" })
  async findAll() {
    return this.queryBus.execute(new GetAllMedicationsQuery());
  }

  @Get(":id")
  @ApiOperation({ summary: "Get medication by ID" })
  @ApiResponse({ status: 200, description: "Medication found" })
  @ApiResponse({ status: 404, description: "Medication not found" })
  async findOne(@Param("id") id: string) {
    return this.queryBus.execute(new GetMedicationByIdQuery(id));
  }

  @Put(":id")
  @ApiOperation({ summary: "Update medication" })
  @ApiResponse({ status: 200, description: "Medication updated" })
  async update(@Param("id") id: string, @Body() dto: UpdateMedicationDto) {
    return this.commandBus.execute(
      new UpdateMedicationCommand(
        id,
        dto.name,
        dto.description,
        dto.dosage_form,
        dto.strength,
        dto.manufacturer
      )
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete medication" })
  @ApiResponse({ status: 200, description: "Medication deleted" })
  async remove(@Param("id") id: string) {
    return this.commandBus.execute(new DeleteMedicationCommand(id));
  }
}
