import { IQueryHandler } from "@nestjs/cqrs";
import { SearchPatientsQuery } from "../impl/search-patients.query";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";
export declare class SearchPatientsHandler implements IQueryHandler<SearchPatientsQuery> {
    private readonly patientRepository;
    constructor(patientRepository: IPatientRepository);
    execute(query: SearchPatientsQuery): Promise<import("../../../infrastructure/dtos/response/patient-dashboard.dto").PatientDashboardDto[]>;
}
