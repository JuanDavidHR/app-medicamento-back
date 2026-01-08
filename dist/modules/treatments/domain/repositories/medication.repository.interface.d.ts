import { MedicationAdministration } from "../entities/medication-administration.entity";
export interface IMedicationRepository {
    findById(id: string): Promise<MedicationAdministration | null>;
    save(admin: MedicationAdministration): Promise<MedicationAdministration>;
}
export declare const IMedicationRepository: unique symbol;
