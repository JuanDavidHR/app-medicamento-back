import { Repository } from "typeorm";
import { MedicationAdministration } from "../../domain/entities/medication-administration.entity";
import { IMedicationRepository } from "../../domain/repositories/medication.repository.interface";
export declare class MedicationRepository implements IMedicationRepository {
    private readonly repository;
    constructor(repository: Repository<MedicationAdministration>);
    findById(id: string): Promise<MedicationAdministration | null>;
    save(admin: MedicationAdministration): Promise<MedicationAdministration>;
}
