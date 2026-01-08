import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TreatmentPlan } from "../../domain/entities/treatment-plan.entity";
import { ITreatmentPlanRepository } from "../../domain/repositories/treatment-plan.repository.interface";

@Injectable()
export class TypeOrmTreatmentPlanRepository implements ITreatmentPlanRepository {
  constructor(
    @InjectRepository(TreatmentPlan)
    private readonly repository: Repository<TreatmentPlan>
  ) {}

  async findById(id: string): Promise<TreatmentPlan | null> {
    return this.repository.findOne({ where: { id }, relations: ["patient"] });
  }

  async findByPatient(patientId: string): Promise<TreatmentPlan[]> {
    return this.repository.find({
      where: { patient_id: patientId, is_active: true },
      relations: ["patient"],
    });
  }

  async findAll(): Promise<TreatmentPlan[]> {
    return this.repository.find({
      where: { is_active: true },
      relations: ["patient"],
    });
  }

  async save(plan: TreatmentPlan): Promise<TreatmentPlan> {
    return this.repository.save(plan);
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { is_active: false });
  }
}
