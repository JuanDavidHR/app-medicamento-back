import { CaregiverPatient } from "../entities/caregiver-patient.entity";

export interface ICaregiverPatientRepository {
  findById(id: string): Promise<CaregiverPatient | null>;
  findByCaregiver(caregiverId: string): Promise<CaregiverPatient[]>;
  findByPatient(patientId: string): Promise<CaregiverPatient[]>;
  save(assignment: CaregiverPatient): Promise<CaregiverPatient>;
  delete(id: string): Promise<void>;
}

export const ICaregiverPatientRepository = Symbol(
  "ICaregiverPatientRepository"
);
