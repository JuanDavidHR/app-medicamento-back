import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import {
  Reminder,
  ReminderStatus,
} from "../../../../domain/entities/reminder.entity";
import { IReminderRepository } from "../../../../domain/repositories/reminder.repository.interface";

@Injectable()
export class TypeOrmReminderRepository implements IReminderRepository {
  constructor(
    @InjectRepository(Reminder)
    private readonly repository: Repository<Reminder>
  ) {}

  async findById(id: string): Promise<Reminder | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["patient", "treatmentPlan"],
    });
  }

  async findByPatient(patientId: string): Promise<Reminder[]> {
    return this.repository.find({
      where: { patient_id: patientId },
      relations: ["treatmentPlan"],
      order: { scheduled_at: "ASC" },
    });
  }

  async findPendingByDate(date: Date): Promise<Reminder[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.repository.find({
      where: {
        scheduled_at: Between(startOfDay, endOfDay),
        status: ReminderStatus.PENDING,
      },
      relations: ["patient", "treatmentPlan"],
    });
  }

  async save(reminder: Reminder): Promise<Reminder> {
    return this.repository.save(reminder);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
