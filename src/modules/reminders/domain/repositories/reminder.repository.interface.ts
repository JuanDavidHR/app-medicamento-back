import { Reminder } from "../entities/reminder.entity";

export interface IReminderRepository {
  findById(id: string): Promise<Reminder | null>;
  findByPatient(patientId: string): Promise<Reminder[]>;
  findPendingByDate(date: Date): Promise<Reminder[]>;
  save(reminder: Reminder): Promise<Reminder>;
  delete(id: string): Promise<void>;
}

export const IReminderRepository = Symbol("IReminderRepository");
