import { AdministrationStatus } from "../../../domain/entities/medication-administration.entity";
export declare class MedicationAdministrationDto {
    readonly id: string;
    readonly treatmentPlanId: string;
    readonly patientId: string;
    readonly status: AdministrationStatus;
    readonly scheduledAt: Date;
    readonly completedAt?: Date;
    readonly version: number;
}
