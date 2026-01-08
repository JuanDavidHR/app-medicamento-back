import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetDashboardQuery } from "../impl/get-dashboard.query";
import { PatientMapper } from "../../mappers/patient.mapper";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";

@QueryHandler(GetDashboardQuery)
export class GetDashboardHandler implements IQueryHandler<GetDashboardQuery> {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository
  ) {}

  async execute(query: GetDashboardQuery) {
    const patients = await this.patientRepository.findAll();
    return {
      totalPatients: patients.length,
      patients: PatientMapper.toDashboardDtoList(patients),
    };
  }
}
