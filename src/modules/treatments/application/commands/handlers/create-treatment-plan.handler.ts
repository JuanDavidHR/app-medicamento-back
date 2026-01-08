import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateTreatmentPlanCommand } from "../impl/create-treatment-plan.command";
import { TreatmentPlan } from "../../../domain/entities/treatment-plan.entity";
import { ITreatmentPlanRepository } from "../../../domain/repositories/treatment-plan.repository.interface";

@CommandHandler(CreateTreatmentPlanCommand)
export class CreateTreatmentPlanHandler implements ICommandHandler<CreateTreatmentPlanCommand> {
  constructor(
    @Inject(ITreatmentPlanRepository)
    private readonly repository: ITreatmentPlanRepository
  ) {}

  async execute(command: CreateTreatmentPlanCommand): Promise<TreatmentPlan> {
    const plan = new TreatmentPlan();
    plan.patient_id = command.patientId;
    plan.medication = command.medication;
    plan.dosage = command.dosage;
    plan.frequency = command.frequency;
    plan.schedule_times = command.scheduleTimes;
    plan.start_date = command.startDate;
    plan.end_date = command.endDate;
    plan.notes = command.notes;

    return this.repository.save(plan);
  }
}
