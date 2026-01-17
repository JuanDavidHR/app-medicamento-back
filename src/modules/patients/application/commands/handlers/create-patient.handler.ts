import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { Inject, Injectable } from "@nestjs/common";
import { Patient } from "../../../domain/entities/patient.entity";
import { CreatePatientCommand } from "../impl/create-patient.command";
import { EventStoreService } from "../../../../../common/services/event-store.service";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";
import { ICaregiverPatientRepository } from "../../../../caregivers/domain/repositories/caregiver-patient.repository.interface";
import { UserRole } from "../../../../users/domain/enums/user-role.enum";
import { CaregiverPatient } from "../../../../caregivers/domain/entities/caregiver-patient.entity";

@CommandHandler(CreatePatientCommand)
export class CreatePatientHandler implements ICommandHandler<CreatePatientCommand> {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
    @Inject(ICaregiverPatientRepository)
    private readonly caregiverPatientRepository: ICaregiverPatientRepository,
    private readonly eventStore: EventStoreService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreatePatientCommand): Promise<Patient> {
    const patient = new Patient();
    Object.assign(patient, {
      name: command.name,
      condition: command.condition,
      aggregate_version: 1,
    });

    const savedPatient = await this.patientRepository.save(patient);

    // If created by caregiver or supervisor, auto-assign
    if (
      command.creatorRole === UserRole.CAREGIVER ||
      command.creatorRole === UserRole.SUPERVISOR
    ) {
      const assignment = new CaregiverPatient();
      assignment.caregiver_id = command.creatorId;
      assignment.patient_id = savedPatient.id;
      assignment.is_active = true;
      await this.caregiverPatientRepository.save(assignment);
    }

    // Persist event in Event Store
    await this.eventStore.saveEvent(
      savedPatient.id,
      "Patient",
      "PatientCreated",
      { name: savedPatient.name, condition: savedPatient.condition },
      1,
    );

    return savedPatient;
  }
}
