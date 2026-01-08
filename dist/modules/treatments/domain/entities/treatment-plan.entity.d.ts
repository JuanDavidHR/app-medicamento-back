import { Patient } from "../../../patients/domain/entities/patient.entity";
export declare class TreatmentPlan {
    id: string;
    patient_id: string;
    medication: string;
    dosage: string;
    frequency: string;
    patient: Patient;
}
