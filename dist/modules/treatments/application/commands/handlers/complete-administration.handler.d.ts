import { ICommandHandler, EventBus } from "@nestjs/cqrs";
import { CompleteAdministrationCommand } from "../impl/complete-administration.command";
import { EventStoreService } from "../../../../../common/services/event-store.service";
import { IMedicationRepository } from "../../../domain/repositories/medication.repository.interface";
export declare class CompleteAdministrationHandler implements ICommandHandler<CompleteAdministrationCommand> {
    private readonly medicationRepository;
    private readonly eventStore;
    private readonly eventBus;
    constructor(medicationRepository: IMedicationRepository, eventStore: EventStoreService, eventBus: EventBus);
    execute(command: CompleteAdministrationCommand): Promise<void>;
}
