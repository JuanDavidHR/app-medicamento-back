import { ICommandHandler } from "@nestjs/cqrs";
import { UpdatePatientCommand } from "../impl/update-patient.command";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";
import { EventStoreService } from "../../../../../common/services/event-store.service";
export declare class UpdatePatientHandler implements ICommandHandler<UpdatePatientCommand> {
    private readonly patientRepository;
    private readonly eventStore;
    constructor(patientRepository: IPatientRepository, eventStore: EventStoreService);
    execute(command: UpdatePatientCommand): Promise<void>;
}
