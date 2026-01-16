import { Patient } from "../entities/patient.entity";

export interface IPatientRepository {
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  findByCaregiverId(caregiverId: string): Promise<Patient[]>;
  search(name?: string, condition?: string): Promise<Patient[]>;
  save(patient: Patient): Promise<Patient>;
}

export const IPatientRepository = Symbol("IPatientRepository");
