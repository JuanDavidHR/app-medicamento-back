import { PatientSearchQueryDto } from "../../../infrastructure/dtos/request/patient-search-query.dto";
export declare class SearchPatientsQuery {
    readonly filters: PatientSearchQueryDto;
    constructor(filters: PatientSearchQueryDto);
}
