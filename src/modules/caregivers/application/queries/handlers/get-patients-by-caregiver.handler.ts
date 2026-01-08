import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetPatientsByCaregiverQuery } from "../impl/get-patients-by-caregiver.query";
import { ICaregiverPatientRepository } from "../../../domain/repositories/caregiver-patient.repository.interface";

@QueryHandler(GetPatientsByCaregiverQuery)
export class GetPatientsByCaregiverHandler implements IQueryHandler<GetPatientsByCaregiverQuery> {
  constructor(
    @Inject(ICaregiverPatientRepository)
    private readonly repository: ICaregiverPatientRepository
  ) {}

  async execute(query: GetPatientsByCaregiverQuery) {
    const assignments = await this.repository.findByCaregiver(
      query.caregiverId
    );
    return assignments.map((a) => a.patient);
  }
}
