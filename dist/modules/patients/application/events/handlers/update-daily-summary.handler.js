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
exports.AdministrationCompletedHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const administration_completed_event_1 = require("../../../../treatments/domain/events/administration-completed.event");
const patient_repository_interface_1 = require("../../../domain/repositories/patient.repository.interface");
let AdministrationCompletedHandler = class AdministrationCompletedHandler {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async handle(event) {
        const patient = await this.patientRepository.findById(event.patientId);
        if (!patient)
            return;
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
};
exports.AdministrationCompletedHandler = AdministrationCompletedHandler;
exports.AdministrationCompletedHandler = AdministrationCompletedHandler = __decorate([
    (0, cqrs_1.EventsHandler)(administration_completed_event_1.AdministrationCompletedEvent),
    __param(0, (0, common_1.Inject)(patient_repository_interface_1.IPatientRepository)),
    __metadata("design:paramtypes", [Object])
], AdministrationCompletedHandler);
//# sourceMappingURL=update-daily-summary.handler.js.map