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
exports.UpdatePatientHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const update_patient_command_1 = require("../impl/update-patient.command");
const patient_repository_interface_1 = require("../../../domain/repositories/patient.repository.interface");
const event_store_service_1 = require("../../../../../common/services/event-store.service");
let UpdatePatientHandler = class UpdatePatientHandler {
    constructor(patientRepository, eventStore) {
        this.patientRepository = patientRepository;
        this.eventStore = eventStore;
    }
    async execute(command) {
        const patient = await this.patientRepository.findById(command.id);
        if (!patient) {
            throw new common_1.NotFoundException(`Patient with ID ${command.id} not found`);
        }
        const { name, condition } = command.data;
        if (name)
            patient.name = name;
        if (condition)
            patient.condition = condition;
        patient.aggregate_version += 1;
        await this.patientRepository.save(patient);
        await this.eventStore.saveEvent(patient.id, "Patient", "PatientUpdated", { name, condition }, patient.aggregate_version);
    }
};
exports.UpdatePatientHandler = UpdatePatientHandler;
exports.UpdatePatientHandler = UpdatePatientHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_patient_command_1.UpdatePatientCommand),
    __param(0, (0, common_1.Inject)(patient_repository_interface_1.IPatientRepository)),
    __metadata("design:paramtypes", [Object, event_store_service_1.EventStoreService])
], UpdatePatientHandler);
//# sourceMappingURL=update-patient.handler.js.map