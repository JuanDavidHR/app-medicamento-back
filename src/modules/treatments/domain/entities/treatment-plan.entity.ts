import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Patient } from "../../../patients/domain/entities/patient.entity";

@Entity("treatment_plans")
export class TreatmentPlan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  patient_id: string;

  @Column()
  medication: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string; // e.g., "every 8 hours", "twice daily"

  @Column({ type: "simple-array", nullable: true })
  schedule_times: string[]; // e.g., ["08:00", "14:00", "20:00"]

  @Column({ type: "date", nullable: true })
  start_date: Date;

  @Column({ type: "date", nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
