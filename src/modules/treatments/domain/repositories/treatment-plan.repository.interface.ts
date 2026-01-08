import { TreatmentPlan } from "../entities/treatment-plan.entity";

export interface ITreatmentPlanRepository {
  findById(id: string): Promise<TreatmentPlan | null>;
  findByPatient(patientId: string): Promise<TreatmentPlan[]>;
  findAll(): Promise<TreatmentPlan[]>;
  save(plan: TreatmentPlan): Promise<TreatmentPlan>;
  delete(id: string): Promise<void>;
}

export const ITreatmentPlanRepository = Symbol("ITreatmentPlanRepository");
