import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "./domain/entities/patient.entity";
import { CreatePatientHandler } from "./application/commands/handlers/create-patient.handler";
import { GetDashboardHandler } from "./application/queries/handlers/get-dashboard.handler";
import { AdministrationCompletedHandler } from "./application/events/handlers/update-daily-summary.handler";
import { PatientsController } from "./interfaces/http/controller/patients.controller";
import { DomainEventEntity } from "../../common/persistence/domain-event.entity";
import { EventStoreService } from "../../common/services/event-store.service";
import { IPatientRepository } from "./domain/repositories/patient.repository.interface";
import { PatientRepository } from "./infrastructure/repositories/patient.repository";

import { UpdatePatientHandler } from "./application/commands/handlers/update-patient.handler";
import { SearchPatientsHandler } from "./application/queries/handlers/search-patients.handler";

const CommandHandlers = [CreatePatientHandler, UpdatePatientHandler];
const QueryHandlers = [GetDashboardHandler, SearchPatientsHandler];
const EventHandlers = [AdministrationCompletedHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Patient, DomainEventEntity])],
  controllers: [PatientsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    EventStoreService,
    {
      provide: IPatientRepository,
      useClass: PatientRepository,
    },
  ],
})
export class PatientsModule {}
