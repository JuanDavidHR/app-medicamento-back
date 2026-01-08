import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TreatmentPlan } from "./domain/entities/treatment-plan.entity";
import { MedicationAdministration } from "./domain/entities/medication-administration.entity";
import { CompleteAdministrationHandler } from "./application/commands/handlers/complete-administration.handler";
import { TreatmentsController } from "./interfaces/http/controller/treatments.controller";
import { DomainEventEntity } from "../../common/persistence/domain-event.entity";
import { EventStoreService } from "../../common/services/event-store.service";
import { IMedicationRepository } from "./domain/repositories/medication.repository.interface";
import { MedicationRepository } from "./infrastructure/repositories/medication.repository";

const CommandHandlers = [CompleteAdministrationHandler];

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
    EventStoreService,
    {
      provide: IMedicationRepository,
      useClass: MedicationRepository,
    },
  ],
})
export class TreatmentsModule {}
