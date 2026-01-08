import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { UpdateTreatmentPlanCommand } from "../impl/update-treatment-plan.command";
import { ITreatmentPlanRepository } from "../../../domain/repositories/treatment-plan.repository.interface";
import { TreatmentPlan } from "../../../domain/entities/treatment-plan.entity";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

@CommandHandler(UpdateTreatmentPlanCommand)
export class UpdateTreatmentPlanHandler implements ICommandHandler<UpdateTreatmentPlanCommand> {
  constructor(
    @Inject(ITreatmentPlanRepository)
    private readonly repository: ITreatmentPlanRepository
  ) {}

  async execute(command: UpdateTreatmentPlanCommand): Promise<TreatmentPlan> {
    const plan = await this.repository.findById(command.id);
    if (!plan) {
      throw new CustomHttpException(
        "Treatment plan not found",
        "ERR_TREATMENT_PLAN_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }

    if (command.medication) plan.medication = command.medication;
    if (command.dosage) plan.dosage = command.dosage;
    if (command.frequency) plan.frequency = command.frequency;
    if (command.scheduleTimes) plan.schedule_times = command.scheduleTimes;
    if (command.startDate) plan.start_date = command.startDate;
    if (command.endDate) plan.end_date = command.endDate;
    if (command.notes !== undefined) plan.notes = command.notes;

    return this.repository.save(plan);
  }
}
