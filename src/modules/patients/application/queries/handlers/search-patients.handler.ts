import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { SearchPatientsQuery } from "../impl/search-patients.query";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";
import { PatientMapper } from "../../mappers/patient.mapper";

@QueryHandler(SearchPatientsQuery)
export class SearchPatientsHandler implements IQueryHandler<SearchPatientsQuery> {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository
  ) {}

  async execute(query: SearchPatientsQuery) {
    const { name, condition } = query.filters;
    const patients = await this.patientRepository.search(name, condition);
    return PatientMapper.toDashboardDtoList(patients);
  }
}
