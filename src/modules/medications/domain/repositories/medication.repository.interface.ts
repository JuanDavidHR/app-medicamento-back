import { Medication } from "../entities/medication.entity";

export interface IMedicationRepository {
  findById(id: string): Promise<Medication | null>;
  findAll(): Promise<Medication[]>;
  findByName(name: string): Promise<Medication | null>;
  save(medication: Medication): Promise<Medication>;
  delete(id: string): Promise<void>;
}

export const IMedicationRepository = Symbol("IMedicationRepository");
