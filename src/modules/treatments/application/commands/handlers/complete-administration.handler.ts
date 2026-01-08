import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { Inject, Injectable } from "@nestjs/common";
import { AdministrationStatus } from "../../../domain/entities/medication-administration.entity";
import { CompleteAdministrationCommand } from "../impl/complete-administration.command";
import { EventStoreService } from "../../../../../common/services/event-store.service";
import { AdministrationCompletedEvent } from "../../../domain/events/administration-completed.event";
import { IMedicationRepository } from "../../../domain/repositories/medication.repository.interface";

@CommandHandler(CompleteAdministrationCommand)
export class CompleteAdministrationHandler implements ICommandHandler<CompleteAdministrationCommand> {
  constructor(
    @Inject(IMedicationRepository)
    private readonly medicationRepository: IMedicationRepository,
    private readonly eventStore: EventStoreService,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CompleteAdministrationCommand): Promise<void> {
    const admin = await this.medicationRepository.findById(
      command.administrationId
    );
    if (!admin) throw new Error("Administration not found");

    admin.status = AdministrationStatus.COMPLETED;
    admin.completed_at = new Date();
    admin.aggregate_version += 1;

    await this.medicationRepository.save(admin);

    // Persist event
    await this.eventStore.saveEvent(
      admin.id,
      "MedicationAdministration",
      "AdministrationCompleted",
      { patientId: admin.patient_id, treatmentPlanId: admin.treatment_plan_id },
      admin.aggregate_version
    );

    // Publish event for handlers
    this.eventBus.publish(
      new AdministrationCompletedEvent(admin.patient_id, admin.id)
    );
  }
}
