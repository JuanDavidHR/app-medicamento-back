import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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
  frequency: string; // e.g., "every 8 hours"

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patient_id" })
  patient: Patient;
}
