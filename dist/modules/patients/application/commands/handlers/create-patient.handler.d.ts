import { ICommandHandler, EventBus } from "@nestjs/cqrs";
import { Patient } from "../../../domain/entities/patient.entity";
import { CreatePatientCommand } from "../impl/create-patient.command";
import { EventStoreService } from "../../../../../common/services/event-store.service";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";
export declare class CreatePatientHandler implements ICommandHandler<CreatePatientCommand> {
    private readonly patientRepository;
    private readonly eventStore;
    private readonly eventBus;
    constructor(patientRepository: IPatientRepository, eventStore: EventStoreService, eventBus: EventBus);
    execute(command: CreatePatientCommand): Promise<Patient>;
}
