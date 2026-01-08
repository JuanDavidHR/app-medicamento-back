import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Patient } from "../../domain/entities/patient.entity";
import { IPatientRepository } from "../../domain/repositories/patient.repository.interface";

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(
    @InjectRepository(Patient)
    private readonly repository: Repository<Patient>
  ) {}

  async findById(id: string): Promise<Patient | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async findAll(): Promise<Patient[]> {
    return this.repository.find();
  }

  async save(patient: Patient): Promise<Patient> {
    return this.repository.save(patient);
  }
}
