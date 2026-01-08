import { MedicationAdministration } from "../entities/medication-administration.entity";

export interface IMedicationRepository {
  findById(id: string): Promise<MedicationAdministration | null>;
  save(admin: MedicationAdministration): Promise<MedicationAdministration>;
}

export const IMedicationRepository = Symbol("IMedicationRepository");
