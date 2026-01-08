"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const patient_entity_1 = require("./domain/entities/patient.entity");
const create_patient_handler_1 = require("./application/commands/handlers/create-patient.handler");
const get_dashboard_handler_1 = require("./application/queries/handlers/get-dashboard.handler");
const update_daily_summary_handler_1 = require("./application/events/handlers/update-daily-summary.handler");
const patients_controller_1 = require("./interfaces/http/controller/patients.controller");
const domain_event_entity_1 = require("../../common/persistence/domain-event.entity");
const event_store_service_1 = require("../../common/services/event-store.service");
const patient_repository_interface_1 = require("./domain/repositories/patient.repository.interface");
const patient_repository_1 = require("./infrastructure/repositories/patient.repository");
const update_patient_handler_1 = require("./application/commands/handlers/update-patient.handler");
const search_patients_handler_1 = require("./application/queries/handlers/search-patients.handler");
const CommandHandlers = [create_patient_handler_1.CreatePatientHandler, update_patient_handler_1.UpdatePatientHandler];
const QueryHandlers = [get_dashboard_handler_1.GetDashboardHandler, search_patients_handler_1.SearchPatientsHandler];
const EventHandlers = [update_daily_summary_handler_1.AdministrationCompletedHandler];
let PatientsModule = class PatientsModule {
};
exports.PatientsModule = PatientsModule;
exports.PatientsModule = PatientsModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, typeorm_1.TypeOrmModule.forFeature([patient_entity_1.Patient, domain_event_entity_1.DomainEventEntity])],
        controllers: [patients_controller_1.PatientsController],
        providers: [
            ...CommandHandlers,
            ...QueryHandlers,
            ...EventHandlers,
            event_store_service_1.EventStoreService,
            {
                provide: patient_repository_interface_1.IPatientRepository,
                useClass: patient_repository_1.PatientRepository,
            },
        ],
    })
], PatientsModule);
//# sourceMappingURL=patients.module.js.map