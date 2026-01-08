"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteAdministrationHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const medication_administration_entity_1 = require("../../../domain/entities/medication-administration.entity");
const complete_administration_command_1 = require("../impl/complete-administration.command");
const event_store_service_1 = require("../../../../../common/services/event-store.service");
const administration_completed_event_1 = require("../../../domain/events/administration-completed.event");
const medication_repository_interface_1 = require("../../../domain/repositories/medication.repository.interface");
let CompleteAdministrationHandler = class CompleteAdministrationHandler {
    constructor(medicationRepository, eventStore, eventBus) {
        this.medicationRepository = medicationRepository;
        this.eventStore = eventStore;
        this.eventBus = eventBus;
    }
    async execute(command) {
        const admin = await this.medicationRepository.findById(command.administrationId);
        if (!admin)
            throw new Error("Administration not found");
        admin.status = medication_administration_entity_1.AdministrationStatus.COMPLETED;
        admin.completed_at = new Date();
        admin.aggregate_version += 1;
        await this.medicationRepository.save(admin);
        await this.eventStore.saveEvent(admin.id, "MedicationAdministration", "AdministrationCompleted", { patientId: admin.patient_id, treatmentPlanId: admin.treatment_plan_id }, admin.aggregate_version);
        this.eventBus.publish(new administration_completed_event_1.AdministrationCompletedEvent(admin.patient_id, admin.id));
    }
};
exports.CompleteAdministrationHandler = CompleteAdministrationHandler;
exports.CompleteAdministrationHandler = CompleteAdministrationHandler = __decorate([
    (0, cqrs_1.CommandHandler)(complete_administration_command_1.CompleteAdministrationCommand),
    __param(0, (0, common_1.Inject)(medication_repository_interface_1.IMedicationRepository)),
    __metadata("design:paramtypes", [Object, event_store_service_1.EventStoreService,
        cqrs_1.EventBus])
], CompleteAdministrationHandler);
//# sourceMappingURL=complete-administration.handler.js.map