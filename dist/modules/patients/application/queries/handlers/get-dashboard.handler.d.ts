import { IQueryHandler } from "@nestjs/cqrs";
import { GetDashboardQuery } from "../impl/get-dashboard.query";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";
export declare class GetDashboardHandler implements IQueryHandler<GetDashboardQuery> {
    private readonly patientRepository;
    constructor(patientRepository: IPatientRepository);
    execute(query: GetDashboardQuery): Promise<{
        totalPatients: number;
        patients: import("../../../infrastructure/dtos/response/patient-dashboard.dto").PatientDashboardDto[];
    }>;
}
