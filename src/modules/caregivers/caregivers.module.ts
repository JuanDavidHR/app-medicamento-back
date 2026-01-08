import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { CaregiverPatient } from "./domain/entities/caregiver-patient.entity";
import { ICaregiverPatientRepository } from "./domain/repositories/caregiver-patient.repository.interface";
import { TypeOrmCaregiverPatientRepository } from "./infrastructure/persistence/typeorm/repositories/typeorm-caregiver-patient.repository";
import { AssignPatientHandler } from "./application/commands/handlers/assign-patient.handler";
import { UnassignPatientHandler } from "./application/commands/handlers/unassign-patient.handler";
import { GetPatientsByCaregiverHandler } from "./application/queries/handlers/get-patients-by-caregiver.handler";
import { CaregiversController } from "./interfaces/http/caregivers.controller";

const CommandHandlers = [AssignPatientHandler, UnassignPatientHandler];
const QueryHandlers = [GetPatientsByCaregiverHandler];

@Module({
  imports: [TypeOrmModule.forFeature([CaregiverPatient]), CqrsModule],
  providers: [
    {
      provide: ICaregiverPatientRepository,
      useClass: TypeOrmCaregiverPatientRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  controllers: [CaregiversController],
  exports: [ICaregiverPatientRepository],
})
export class CaregiversModule {}
