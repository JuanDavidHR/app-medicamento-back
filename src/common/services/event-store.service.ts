import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DomainEventEntity } from "../persistence/domain-event.entity";

@Injectable()
export class EventStoreService {
  constructor(
    @InjectRepository(DomainEventEntity)
    private readonly eventRepository: Repository<DomainEventEntity>
  ) {}

  async saveEvent(
    aggregate_id: string,
    aggregate_type: string,
    event_type: string,
    payload: any,
    version: number
  ) {
    const event = this.eventRepository.create({
      aggregate_id,
      aggregate_type,
      event_type,
      payload,
      version,
    });
    return this.eventRepository.save(event);
  }
}
