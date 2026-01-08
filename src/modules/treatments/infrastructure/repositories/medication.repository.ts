import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicationAdministration } from "../../domain/entities/medication-administration.entity";
import { IMedicationRepository } from "../../domain/repositories/medication.repository.interface";

@Injectable()
export class MedicationRepository implements IMedicationRepository {
  constructor(
    @InjectRepository(MedicationAdministration)
    private readonly repository: Repository<MedicationAdministration>
  ) {}

  async findById(id: string): Promise<MedicationAdministration | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async save(
    admin: MedicationAdministration
  ): Promise<MedicationAdministration> {
    return this.repository.save(admin);
  }
}
