"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientMapper = void 0;
class PatientMapper {
    static toDashboardDto(patient) {
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
    static toDashboardDtoList(patients) {
        return patients.map((patient) => this.toDashboardDto(patient));
    }
}
exports.PatientMapper = PatientMapper;
//# sourceMappingURL=patient.mapper.js.map