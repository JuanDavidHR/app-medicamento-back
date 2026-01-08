import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllTreatmentPlansQuery } from "../impl/get-all-treatment-plans.query";
import { ITreatmentPlanRepository } from "../../../domain/repositories/treatment-plan.repository.interface";

@QueryHandler(GetAllTreatmentPlansQuery)
export class GetAllTreatmentPlansHandler implements IQueryHandler<GetAllTreatmentPlansQuery> {
  constructor(
    @Inject(ITreatmentPlanRepository)
    private readonly repository: ITreatmentPlanRepository
  ) {}

  async execute() {
    return this.repository.findAll();
  }
}
