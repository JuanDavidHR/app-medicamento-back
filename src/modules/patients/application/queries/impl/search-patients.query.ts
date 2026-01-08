import { PatientSearchQueryDto } from "../../../infrastructure/dtos/request/patient-search-query.dto";

export class SearchPatientsQuery {
  constructor(public readonly filters: PatientSearchQueryDto) {}
}
