import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  condition: string;

  @Column({ type: 'jsonb', nullable: true })
  daily_summary: any;

  @Column({ default: 1 })
  aggregate_version: number;

  @UpdateDateColumn()
  updated_at: Date;
}
