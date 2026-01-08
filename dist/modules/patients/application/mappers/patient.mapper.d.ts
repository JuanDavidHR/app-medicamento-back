import { Patient } from "../../domain/entities/patient.entity";
import { PatientDashboardDto } from "../../infrastructure/dtos/patient-dashboard.dto";
export declare class PatientMapper {
    static toDashboardDto(patient: Patient): PatientDashboardDto;
    static toDashboardDtoList(patients: Patient[]): PatientDashboardDto[];
}
