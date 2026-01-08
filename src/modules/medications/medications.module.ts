import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { Medication } from "./domain/entities/medication.entity";
import { IMedicationRepository } from "./domain/repositories/medication.repository.interface";
import { TypeOrmMedicationRepository } from "./infrastructure/persistence/typeorm/repositories/typeorm-medication.repository";
import { CreateMedicationHandler } from "./application/commands/handlers/create-medication.handler";
import { UpdateMedicationHandler } from "./application/commands/handlers/update-medication.handler";
import { DeleteMedicationHandler } from "./application/commands/handlers/delete-medication.handler";
import { GetMedicationByIdHandler } from "./application/queries/handlers/get-medication-by-id.handler";
import { GetAllMedicationsHandler } from "./application/queries/handlers/get-all-medications.handler";
import { MedicationsController } from "./interfaces/http/medications.controller";

const CommandHandlers = [
  CreateMedicationHandler,
  UpdateMedicationHandler,
  DeleteMedicationHandler,
];
const QueryHandlers = [GetMedicationByIdHandler, GetAllMedicationsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Medication]), CqrsModule],
  providers: [
    {
      provide: IMedicationRepository,
      useClass: TypeOrmMedicationRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  controllers: [MedicationsController],
  exports: [IMedicationRepository],
})
export class MedicationsModule {}
