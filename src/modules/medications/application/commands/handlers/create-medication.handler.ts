import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { CreateMedicationCommand } from "../impl/create-medication.command";
import { Medication } from "../../../domain/entities/medication.entity";
import { IMedicationRepository } from "../../../domain/repositories/medication.repository.interface";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

@CommandHandler(CreateMedicationCommand)
export class CreateMedicationHandler implements ICommandHandler<CreateMedicationCommand> {
  constructor(
    @Inject(IMedicationRepository)
    private readonly medicationRepository: IMedicationRepository
  ) {}

  async execute(command: CreateMedicationCommand): Promise<Medication> {
    const existing = await this.medicationRepository.findByName(command.name);
    if (existing) {
      throw new CustomHttpException(
        "Medication already exists",
        "ERR_MEDICATION_ALREADY_EXISTS",
        HttpStatus.CONFLICT
      );
    }

    const medication = new Medication();
    Object.assign(medication, {
      name: command.name,
      description: command.description,
      dosage_form: command.dosage_form,
      strength: command.strength,
      manufacturer: command.manufacturer,
    });

    return this.medicationRepository.save(medication);
  }
}
