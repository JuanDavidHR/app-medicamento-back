import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { DeleteMedicationCommand } from "../impl/delete-medication.command";
import { IMedicationRepository } from "../../../domain/repositories/medication.repository.interface";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

interface DeleteResponse {
  deleted: boolean;
  id: string;
}

@CommandHandler(DeleteMedicationCommand)
export class DeleteMedicationHandler implements ICommandHandler<DeleteMedicationCommand> {
  constructor(
    @Inject(IMedicationRepository)
    private readonly medicationRepository: IMedicationRepository
  ) {}

  async execute(command: DeleteMedicationCommand): Promise<DeleteResponse> {
    const medication = await this.medicationRepository.findById(command.id);
    if (!medication) {
      throw new CustomHttpException(
        "Medication not found",
        "ERR_MEDICATION_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }

    await this.medicationRepository.delete(command.id);
    return { deleted: true, id: command.id };
  }
}
