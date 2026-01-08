import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { DeleteTreatmentPlanCommand } from "../impl/delete-treatment-plan.command";
import { ITreatmentPlanRepository } from "../../../domain/repositories/treatment-plan.repository.interface";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

interface DeleteResponse {
  deleted: boolean;
  id: string;
}

@CommandHandler(DeleteTreatmentPlanCommand)
export class DeleteTreatmentPlanHandler implements ICommandHandler<DeleteTreatmentPlanCommand> {
  constructor(
    @Inject(ITreatmentPlanRepository)
    private readonly repository: ITreatmentPlanRepository
  ) {}

  async execute(command: DeleteTreatmentPlanCommand): Promise<DeleteResponse> {
    const plan = await this.repository.findById(command.id);
    if (!plan) {
      throw new CustomHttpException(
        "Treatment plan not found",
        "ERR_TREATMENT_PLAN_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }

    await this.repository.delete(command.id);
    return { deleted: true, id: command.id };
  }
}
