import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Medication } from "../../../../domain/entities/medication.entity";
import { IMedicationRepository } from "../../../../domain/repositories/medication.repository.interface";

@Injectable()
export class TypeOrmMedicationRepository implements IMedicationRepository {
  constructor(
    @InjectRepository(Medication)
    private readonly repository: Repository<Medication>
  ) {}

  async findById(id: string): Promise<Medication | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Medication[]> {
    return this.repository.find({ where: { is_active: true } });
  }

  async findByName(name: string): Promise<Medication | null> {
    return this.repository.findOne({ where: { name } });
  }

  async save(medication: Medication): Promise<Medication> {
    return this.repository.save(medication);
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { is_active: false });
  }
}
