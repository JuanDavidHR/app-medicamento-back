import { Patient } from "../../domain/entities/patient.entity";
import { PatientDashboardDto } from "../../infrastructure/dtos/patient-dashboard.dto";

export class PatientMapper {
  static toDashboardDto(patient: Patient): PatientDashboardDto {
    return {
      id: patient.id,
      name: patient.name,
      condition: patient.condition,
      summary: patient.daily_summary
        ? {
            completedCount: patient.daily_summary.completedCount || 0,
            history: patient.daily_summary.history || [],
          }
        : undefined,
    };
  }

  static toDashboardDtoList(patients: Patient[]): PatientDashboardDto[] {
    return patients.map((patient) => this.toDashboardDto(patient));
  }
}
