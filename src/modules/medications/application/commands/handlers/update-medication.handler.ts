import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { UpdateMedicationCommand } from "../impl/update-medication.command";
import { IMedicationRepository } from "../../../domain/repositories/medication.repository.interface";
import { Medication } from "../../../domain/entities/medication.entity";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

@CommandHandler(UpdateMedicationCommand)
export class UpdateMedicationHandler implements ICommandHandler<UpdateMedicationCommand> {
  constructor(
    @Inject(IMedicationRepository)
    private readonly medicationRepository: IMedicationRepository
  ) {}

  async execute(command: UpdateMedicationCommand): Promise<Medication> {
    const medication = await this.medicationRepository.findById(command.id);
    if (!medication) {
      throw new CustomHttpException(
        "Medication not found",
        "ERR_MEDICATION_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }

    if (command.name) medication.name = command.name;
    if (command.description) medication.description = command.description;
    if (command.dosage_form) medication.dosage_form = command.dosage_form;
    if (command.strength) medication.strength = command.strength;
    if (command.manufacturer) medication.manufacturer = command.manufacturer;

    return this.medicationRepository.save(medication);
  }
}
