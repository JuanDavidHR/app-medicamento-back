import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "../../../users/domain/entities/user.entity";
import { Patient } from "../../../patients/domain/entities/patient.entity";

@Entity("caregiver_patients")
export class CaregiverPatient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  caregiver_id: string;

  @Column()
  patient_id: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: "caregiver_id" })
  caregiver: User;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;
}
