import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('domain_events')
export class DomainEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  aggregate_id: string;

  @Column()
  aggregate_type: string;

  @Column()
  event_type: string;

  @Column({ type: 'jsonb' })
  payload: any;

  @Column()
  version: number;

  @CreateDateColumn()
  occurred_at: Date;
}
