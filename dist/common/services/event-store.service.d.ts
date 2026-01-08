import { Repository } from "typeorm";
import { DomainEventEntity } from "../persistence/domain-event.entity";
export declare class EventStoreService {
    private readonly eventRepository;
    constructor(eventRepository: Repository<DomainEventEntity>);
    saveEvent(aggregate_id: string, aggregate_type: string, event_type: string, payload: any, version: number): Promise<DomainEventEntity>;
}
