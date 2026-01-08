"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentMapper = void 0;
class TreatmentMapper {
    static toAdministrationDto(entity) {
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
exports.TreatmentMapper = TreatmentMapper;
//# sourceMappingURL=treatment.mapper.js.map