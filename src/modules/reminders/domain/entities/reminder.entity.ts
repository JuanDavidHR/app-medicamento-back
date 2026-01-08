import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Patient } from "../../../patients/domain/entities/patient.entity";
import { TreatmentPlan } from "../../../treatments/domain/entities/treatment-plan.entity";

export enum ReminderStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  ACKNOWLEDGED = "ACKNOWLEDGED",
  SKIPPED = "SKIPPED",
}

@Entity("reminders")
export class Reminder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  patient_id: string;

  @Column({ nullable: true })
  treatment_plan_id: string;

  @Column()
  scheduled_at: Date;

  @Column({ type: "time" })
  scheduled_time: string; // e.g., "08:00", "14:00", "20:00"

  @Column({ nullable: true })
  message: string;

  @Column({
    type: "enum",
    enum: ReminderStatus,
    default: ReminderStatus.PENDING,
  })
  status: ReminderStatus;

  @Column({ nullable: true })
  sent_at: Date;

  @Column({ nullable: true })
  acknowledged_at: Date;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @ManyToOne(() => TreatmentPlan)
  @JoinColumn({ name: "treatment_plan_id" })
  treatmentPlan: TreatmentPlan;

  @CreateDateColumn()
  created_at: Date;
}
