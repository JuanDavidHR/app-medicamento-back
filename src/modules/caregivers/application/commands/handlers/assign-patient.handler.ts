import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AssignPatientCommand } from "../impl/assign-patient.command";
import { CaregiverPatient } from "../../../domain/entities/caregiver-patient.entity";
import { ICaregiverPatientRepository } from "../../../domain/repositories/caregiver-patient.repository.interface";

@CommandHandler(AssignPatientCommand)
export class AssignPatientHandler implements ICommandHandler<AssignPatientCommand> {
  constructor(
    @Inject(ICaregiverPatientRepository)
    private readonly repository: ICaregiverPatientRepository
  ) {}

  async execute(command: AssignPatientCommand): Promise<CaregiverPatient> {
    const assignment = new CaregiverPatient();
    assignment.caregiver_id = command.caregiverId;
    assignment.patient_id = command.patientId;

    return this.repository.save(assignment);
  }
}
