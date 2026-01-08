import { IEventHandler } from "@nestjs/cqrs";
import { AdministrationCompletedEvent } from "../../../../treatments/domain/events/administration-completed.event";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";
export declare class AdministrationCompletedHandler implements IEventHandler<AdministrationCompletedEvent> {
    private readonly patientRepository;
    constructor(patientRepository: IPatientRepository);
    handle(event: AdministrationCompletedEvent): Promise<void>;
}
