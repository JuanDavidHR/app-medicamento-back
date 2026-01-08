import { TreatmentPlan } from './treatment-plan.entity';
export declare enum AdministrationStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    SKIPPED = "SKIPPED"
}
export declare class MedicationAdministration {
    id: string;
    treatment_plan_id: string;
    patient_id: string;
    status: AdministrationStatus;
    scheduled_at: Date;
    completed_at: Date;
    aggregate_version: number;
    treatmentPlan: TreatmentPlan;
    created_at: Date;
}
