import { Patient } from "../entities/patient.entity";
export interface IPatientRepository {
    findById(id: string): Promise<Patient | null>;
    findAll(): Promise<Patient[]>;
    search(name?: string, condition?: string): Promise<Patient[]>;
    save(patient: Patient): Promise<Patient>;
}
export declare const IPatientRepository: unique symbol;
