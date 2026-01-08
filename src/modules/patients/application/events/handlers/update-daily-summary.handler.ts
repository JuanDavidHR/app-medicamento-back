import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { Patient } from "../../../domain/entities/patient.entity";
import { AdministrationCompletedEvent } from "../../../../treatments/domain/events/administration-completed.event";
import { IPatientRepository } from "../../../domain/repositories/patient.repository.interface";

@EventsHandler(AdministrationCompletedEvent)
export class AdministrationCompletedHandler implements IEventHandler<AdministrationCompletedEvent> {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository
  ) {}

  async handle(event: AdministrationCompletedEvent) {
    const patient = await this.patientRepository.findById(event.patientId);
    if (!patient) return;

    // Simulate updating summary (e.g., incrementing a counter or adding to log)
    const summary = patient.daily_summary || { completedCount: 0, history: [] };
    summary.completedCount += 1;
    summary.history.push({
      administrationId: event.administrationId,
      time: new Date().toISOString(),
    });

    patient.daily_summary = summary;
    patient.aggregate_version += 1;

    await this.patientRepository.save(patient);
  }
}
