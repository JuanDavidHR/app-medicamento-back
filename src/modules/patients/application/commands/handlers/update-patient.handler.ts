import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { UpdatePatientCommand } from "../impl/update-patient.command";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";
import { EventStoreService } from "../../../../../common/services/event-store.service";

@CommandHandler(UpdatePatientCommand)
export class UpdatePatientHandler implements ICommandHandler<UpdatePatientCommand> {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
    private readonly eventStore: EventStoreService
  ) {}

  async execute(command: UpdatePatientCommand): Promise<void> {
    const patient = await this.patientRepository.findById(command.id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${command.id} not found`);
    }

    const { name, condition } = command.data;

    if (name) patient.name = name;
    if (condition) patient.condition = condition;

    patient.aggregate_version += 1;

    await this.patientRepository.save(patient);

    // Persist event
    await this.eventStore.saveEvent(
      patient.id,
      "Patient",
      "PatientUpdated",
      { name, condition },
      patient.aggregate_version
    );
  }
}
