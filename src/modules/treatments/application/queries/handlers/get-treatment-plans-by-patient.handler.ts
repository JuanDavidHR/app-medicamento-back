import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetTreatmentPlansByPatientQuery } from "../impl/get-treatment-plans-by-patient.query";
import { ITreatmentPlanRepository } from "../../../domain/repositories/treatment-plan.repository.interface";

@QueryHandler(GetTreatmentPlansByPatientQuery)
export class GetTreatmentPlansByPatientHandler implements IQueryHandler<GetTreatmentPlansByPatientQuery> {
  constructor(
    @Inject(ITreatmentPlanRepository)
    private readonly repository: ITreatmentPlanRepository
  ) {}

  async execute(query: GetTreatmentPlansByPatientQuery) {
    return this.repository.findByPatient(query.patientId);
  }
}
