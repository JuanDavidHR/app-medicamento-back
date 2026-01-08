export declare class DomainEventEntity {
    id: string;
    aggregate_id: string;
    aggregate_type: string;
    event_type: string;
    payload: any;
    version: number;
    occurred_at: Date;
}
