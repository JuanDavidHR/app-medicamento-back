import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject, HttpStatus } from "@nestjs/common";
import { GetTreatmentPlanByIdQuery } from "../impl/get-treatment-plan-by-id.query";
import { ITreatmentPlanRepository } from "../../../domain/repositories/treatment-plan.repository.interface";
import { TreatmentPlan } from "../../../domain/entities/treatment-plan.entity";
import { CustomHttpException } from "../../../../../common/exceptions/custom-http.exception";

@QueryHandler(GetTreatmentPlanByIdQuery)
export class GetTreatmentPlanByIdHandler implements IQueryHandler<GetTreatmentPlanByIdQuery> {
  constructor(
    @Inject(ITreatmentPlanRepository)
    private readonly repository: ITreatmentPlanRepository
  ) {}

  async execute(query: GetTreatmentPlanByIdQuery): Promise<TreatmentPlan> {
    const plan = await this.repository.findById(query.id);
    if (!plan) {
      throw new CustomHttpException(
        "Treatment plan not found",
        "ERR_TREATMENT_PLAN_NOT_FOUND",
        HttpStatus.NOT_FOUND
      );
    }
    return plan;
  }
}
