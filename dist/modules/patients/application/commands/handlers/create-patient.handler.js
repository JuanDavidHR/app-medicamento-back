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
exports.CreatePatientHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const patient_entity_1 = require("../../../domain/entities/patient.entity");
const create_patient_command_1 = require("../impl/create-patient.command");
const event_store_service_1 = require("../../../../../common/services/event-store.service");
const patient_repository_interface_1 = require("../../../domain/repositories/patient.repository.interface");
let CreatePatientHandler = class CreatePatientHandler {
    constructor(patientRepository, eventStore, eventBus) {
        this.patientRepository = patientRepository;
        this.eventStore = eventStore;
        this.eventBus = eventBus;
    }
    async execute(command) {
        const patient = new patient_entity_1.Patient();
        Object.assign(patient, {
            name: command.name,
            condition: command.condition,
            aggregate_version: 1,
        });
        const savedPatient = await this.patientRepository.save(patient);
        await this.eventStore.saveEvent(savedPatient.id, "Patient", "PatientCreated", { name: savedPatient.name, condition: savedPatient.condition }, 1);
        return savedPatient;
    }
};
exports.CreatePatientHandler = CreatePatientHandler;
exports.CreatePatientHandler = CreatePatientHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_patient_command_1.CreatePatientCommand),
    __param(0, (0, common_1.Inject)(patient_repository_interface_1.IPatientRepository)),
    __metadata("design:paramtypes", [Object, event_store_service_1.EventStoreService,
        cqrs_1.EventBus])
], CreatePatientHandler);
//# sourceMappingURL=create-patient.handler.js.map