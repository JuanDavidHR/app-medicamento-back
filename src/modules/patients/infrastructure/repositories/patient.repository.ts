import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Patient } from "../../domain/entities/patient.entity";
import { IPatientRepository } from "../../domain/repositories/patient.repository.interface";

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(
    @InjectRepository(Patient)
    private readonly repository: Repository<Patient>,
  ) {}

  async findById(id: string): Promise<Patient | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async findAll(): Promise<Patient[]> {
    return this.repository.find();
  }

  async findByCaregiverId(caregiverId: string): Promise<Patient[]> {
    return this.repository
      .createQueryBuilder("patient")
      .innerJoin("caregiver_patients", "cp", "cp.patient_id = patient.id")
      .where("cp.caregiver_id = :caregiverId", { caregiverId })
      .andWhere("cp.is_active = :isActive", { isActive: true })
      .getMany();
  }

  async search(name?: string, condition?: string): Promise<Patient[]> {
    const queryBuilder = this.repository.createQueryBuilder("patient");

    if (name) {
      queryBuilder.andWhere("patient.name ILIKE :name", { name: `%${name}%` });
    }

    if (condition) {
      queryBuilder.andWhere("patient.condition ILIKE :condition", {
        condition: `%${condition}%`,
      });
    }

    return queryBuilder.getMany();
  }

  async save(patient: Patient): Promise<Patient> {
    return this.repository.save(patient);
  }
}
