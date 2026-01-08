import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CaregiverPatient } from "../../../../domain/entities/caregiver-patient.entity";
import { ICaregiverPatientRepository } from "../../../../domain/repositories/caregiver-patient.repository.interface";

@Injectable()
export class TypeOrmCaregiverPatientRepository implements ICaregiverPatientRepository {
  constructor(
    @InjectRepository(CaregiverPatient)
    private readonly repository: Repository<CaregiverPatient>
  ) {}

  async findById(id: string): Promise<CaregiverPatient | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["caregiver", "patient"],
    });
  }

  async findByCaregiver(caregiverId: string): Promise<CaregiverPatient[]> {
    return this.repository.find({
      where: { caregiver_id: caregiverId, is_active: true },
      relations: ["patient"],
    });
  }

  async findByPatient(patientId: string): Promise<CaregiverPatient[]> {
    return this.repository.find({
      where: { patient_id: patientId, is_active: true },
      relations: ["caregiver"],
    });
  }

  async save(assignment: CaregiverPatient): Promise<CaregiverPatient> {
    return this.repository.save(assignment);
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { is_active: false });
  }
}
