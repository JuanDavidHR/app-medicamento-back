import { Repository } from "typeorm";
import { Patient } from "../../domain/entities/patient.entity";
import { IPatientRepository } from "../../domain/repositories/patient.repository.interface";
export declare class PatientRepository implements IPatientRepository {
    private readonly repository;
    constructor(repository: Repository<Patient>);
    findById(id: string): Promise<Patient | null>;
    findAll(): Promise<Patient[]>;
    save(patient: Patient): Promise<Patient>;
}
