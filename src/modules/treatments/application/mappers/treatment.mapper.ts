import { MedicationAdministration } from "../../domain/entities/medication-administration.entity";
import { MedicationAdministrationDto } from "../../infrastructure/dtos/response/medication-administration.dto";

export class TreatmentMapper {
  static toAdministrationDto(
    entity: MedicationAdministration
  ): MedicationAdministrationDto {
    return {
      id: entity.id,
      treatmentPlanId: entity.treatment_plan_id,
      patientId: entity.patient_id,
      status: entity.status,
      scheduledAt: entity.scheduled_at,
      completedAt: entity.completed_at,
      version: entity.aggregate_version,
    };
  }
}
