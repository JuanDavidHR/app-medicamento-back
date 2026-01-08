import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { TreatmentPlan } from './treatment-plan.entity';

export enum AdministrationStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
}

@Entity('medication_administrations')
export class MedicationAdministration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  treatment_plan_id: string;

  @Column()
  patient_id: string;

  @Column({
    type: 'enum',
    enum: AdministrationStatus,
    default: AdministrationStatus.PENDING,
  })
  status: AdministrationStatus;

  @Column()
  scheduled_at: Date;

  @Column({ nullable: true })
  completed_at: Date;

  @Column({ default: 1 })
  aggregate_version: number;

  @ManyToOne(() => TreatmentPlan)
  @JoinColumn({ name: 'treatment_plan_id' })
  treatmentPlan: TreatmentPlan;

  @CreateDateColumn()
  created_at: Date;
}
