import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { UnassignPatientCommand } from "../impl/unassign-patient.command";
import { ICaregiverPatientRepository } from "../../../domain/repositories/caregiver-patient.repository.interface";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

interface UnassignResponse {
  unassigned: boolean;
  id: string;
}

@CommandHandler(UnassignPatientCommand)
export class UnassignPatientHandler implements ICommandHandler<UnassignPatientCommand> {
  constructor(
    @Inject(ICaregiverPatientRepository)
    private readonly repository: ICaregiverPatientRepository
  ) {}

  async execute(command: UnassignPatientCommand): Promise<UnassignResponse> {
    const assignment = await this.repository.findById(command.id);
    if (!assignment) {
      throw new CustomHttpException(
        "Assignment not found",
        "ERR_ASSIGNMENT_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }

    await this.repository.delete(command.id);
    return { unassigned: true, id: command.id };
  }
}
