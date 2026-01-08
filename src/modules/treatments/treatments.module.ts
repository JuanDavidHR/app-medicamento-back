import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TreatmentPlan } from "./domain/entities/treatment-plan.entity";
import { MedicationAdministration } from "./domain/entities/medication-administration.entity";
import { CompleteAdministrationHandler } from "./application/commands/handlers/complete-administration.handler";
import { CreateTreatmentPlanHandler } from "./application/commands/handlers/create-treatment-plan.handler";
import { UpdateTreatmentPlanHandler } from "./application/commands/handlers/update-treatment-plan.handler";
import { DeleteTreatmentPlanHandler } from "./application/commands/handlers/delete-treatment-plan.handler";
import { GetTreatmentPlanByIdHandler } from "./application/queries/handlers/get-treatment-plan-by-id.handler";
import { GetTreatmentPlansByPatientHandler } from "./application/queries/handlers/get-treatment-plans-by-patient.handler";
import { GetAllTreatmentPlansHandler } from "./application/queries/handlers/get-all-treatment-plans.handler";
import { TreatmentsController } from "./interfaces/http/controller/treatments.controller";
import { DomainEventEntity } from "../../common/persistence/domain-event.entity";
import { EventStoreService } from "../../common/services/event-store.service";
import { IMedicationRepository } from "./domain/repositories/medication.repository.interface";
import { MedicationRepository } from "./infrastructure/repositories/medication.repository";
import { ITreatmentPlanRepository } from "./domain/repositories/treatment-plan.repository.interface";
import { TypeOrmTreatmentPlanRepository } from "./infrastructure/repositories/typeorm-treatment-plan.repository";

const CommandHandlers = [
  CompleteAdministrationHandler,
  CreateTreatmentPlanHandler,
  UpdateTreatmentPlanHandler,
  DeleteTreatmentPlanHandler,
];

const QueryHandlers = [
  GetTreatmentPlanByIdHandler,
  GetTreatmentPlansByPatientHandler,
  GetAllTreatmentPlansHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      TreatmentPlan,
      MedicationAdministration,
      DomainEventEntity,
    ]),
  ],
  controllers: [TreatmentsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    EventStoreService,
    {
      provide: IMedicationRepository,
      useClass: MedicationRepository,
    },
    {
      provide: ITreatmentPlanRepository,
      useClass: TypeOrmTreatmentPlanRepository,
    },
  ],
})
export class TreatmentsModule {}
